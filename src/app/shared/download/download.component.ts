import {Component, OnInit, Input} from "@angular/core";
import {DocumentServiceService} from "../../sub-modules/documents/document-service.service";
import {ToastsManager} from "ng2-toastr";
import * as FileSaver from "file-saver";

@Component({
    selector: 'acsi-download',
    template: `<a (click)="downloadFile() "><i class="fa fa-download" aria-hidden="true"></i></a>`
})
export class DownloadComponent implements OnInit {

    @Input()
    type: string;
    @Input()
    id: string;
    @Input()
    isSourceCrm2011: boolean;

    constructor(private documentService: DocumentServiceService,
                public toastr: ToastsManager) {
    }

    ngOnInit() {
    }

    downloadFile() {
        if (this.type && this.id) {
            this.documentService.getDocumentById(this.id, this.type, this.isSourceCrm2011)
                .subscribe(response => {
                        if (response.data) {
                            alert("File not found!");
                            return;
                        }
                        var mediaType = response.FileType;
                        var blob = this.documentService.base64ToBlobConvert(response);
                        FileSaver.saveAs(blob, response.Name);
                    },
                    error => {
                        let errors = error.json();
                        alert(errors.ExceptionMessage);
                    }
                );
        } else {
            alert("Some parameter is missing!");
        }
    }

}
