import {Component, OnInit, ViewChild} from "@angular/core";
import {FileUploader} from "ng2-file-upload";
import {ToastsManager} from "ng2-toastr";
import {DocumentServiceService} from "../document-service.service";
import {Document} from "../document";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AcsiService} from "../../../shared/acsi.service";

@Component({
    selector: 'acsi-upload-document',
    templateUrl: './upload-document.component.html',
    styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

    public documentSecurityLevels: any[];
    public labels: any[];
    public uploader: FileUploader = new FileUploader({});
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    public files: any[] = [];
    public file_srcs: any[] = [];
    public document = {
        LabelId: "",
        SecurityLevelId: ""
    };
    public documents: Document[] = [];
    private parentRouteId: string;
    private sub: Subscription;
    private entityType: number;
    @ViewChild('documentModal') documentModal: any;

    constructor(private documentService: DocumentServiceService,
                private acsiService: AcsiService,
                public toastr: ToastsManager,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.entityType = this.route.snapshot.parent.data['entityType'];
        if (this.route.snapshot.parent.data.hasOwnProperty('accountInfo')) {
            this.parentRouteId = this.route.snapshot.parent.data['accountInfo'].Id;
        }
        if (this.route.snapshot.parent.data.hasOwnProperty('contactInfo')) {
            this.parentRouteId = this.route.snapshot.parent.data['contactInfo'].AccountId;
        }
        this.acsiService.getLabels().subscribe((labels: any) => {
            this.labels = labels;
        });
        this.uploader = new FileUploader({});
        this.document.LabelId = "";
        this.document.SecurityLevelId = "";
        this.acsiService.getDocumentSecurityLevels()
            .subscribe((levels: any) => this.documentSecurityLevels = levels, (error: any) => {
                let errors = error.json();
                alert(errors.ExceptionMessage);
            });
    }

    onUploadDocuments() {
        this.documents = [];
        if (this.uploader.queue.length) {
            this.uploader.queue.forEach((file: any) => {
                // Create an img element and add the image file data to it
                var img = window.URL.createObjectURL(file._file);
                // Create a FileReader
                var target: EventTarget;
                var reader = new FileReader();
                reader.addEventListener("load", (event) => {
                    // Get the event.target.result from the reader (base64 of the image)
                    var document = new Document();
                    document.Data = reader.result.substr(reader.result.indexOf(',') + 1);
                    document.FileType = file._file.type;
                    document.Name = file._file.name;
                    document.Size = file._file.size.toString();
                    document.SecurityLevelId = this.document.SecurityLevelId;
                    document.LabelId = this.document.LabelId;

                    this.documents.push(document);
                    if (this.documents.length === this.uploader.queue.length) {
                        this.documentService.uploadDocument(this.parentRouteId, this.entityType, this.documents)
                            .subscribe(response => {
                                if (response) {
                                    this.toastr.info("Document uploaded!");
                                    this.documentService.documentUpdateEvent$.emit(true);
                                    this.navigateBack();
                                }
                            }, error => {
                                let errors = error.json();
                                alert(errors.ExceptionMessage);
                            })
                    }
                }, false);
                reader.readAsDataURL(file._file);
            })
        }

    }


    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    private navigateBack() {
        this.documentModal.close();
        //this.router.navigate(['../'], {relativeTo: this.route, preserveQueryParams: true});
    }
}
