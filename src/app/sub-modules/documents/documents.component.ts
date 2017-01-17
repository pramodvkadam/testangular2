import {Component, OnInit} from "@angular/core";
import {Document} from "./document";
import {Subscription} from "rxjs";
import {DocumentServiceService} from "./document-service.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'acsi-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

    private subscription: Subscription;
    private entityNumber: any;
    private entityType: number;
    private documents: Document[];
    private querySub: Subscription;
    private accountId: any;

    constructor(private documentService: DocumentServiceService,
                private router: Router,
                private route: ActivatedRoute,
                public toastr: ToastsManager) {
        this.documentService.documentUpdateEvent$.subscribe(() => {
            this.getData();
        });
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: Params) => {
                this.entityNumber = params['accountNumber'];
                this.entityType = Number(!this.entityNumber);
                this.getData();
            });
    }

    getData() {
        this.documentService.getDocumentsByEntity(this.entityNumber, this.entityType).subscribe(
            (documents: Document[]) => {
                this.documents = documents;
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage || errors.Message, "Oops!");
            })
    }
}
