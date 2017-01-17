import {Component, OnInit, Input} from "@angular/core";
import {DocumentServiceService} from "../../sub-modules/documents/document-service.service";

@Component({
    selector: 'acsi-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
    @Input()
    documents: Document[];
    filteredData: Document[];
    @Input()
    entityId: string;
    @Input()
    entityType: number;
    private fields: any;

    constructor(private documentService: DocumentServiceService) {
    }


    ngOnInit() {
        this.fields = this.documentService.getDocumentsFields();
        this.filterData("", "Id");
    }

    deleteDocument(documentId: string, index: number) {
        let confirmation = confirm("Are you sure to delete Document!");
        if (confirmation) {
            this.documentService.deleteDocumentById(documentId).subscribe((response: any) => {
                if (response === true) {
                    this.documents.splice(index, 1);
                    this.filterData("", "Id");
                    alert("Document deleted successfully!");
                }
            }, (error: any) => {
                let errors = error.json();
                alert(errors.ExceptionMessage);
            })
        }
    }

    filterData(filterVal: string, column: string) {
        let filterString = filterVal ? filterVal.toLocaleLowerCase() : '';
        let filteredData: Array<Document> = this.documents.filter((item: Document) =>
            item[column].toLocaleLowerCase().match(filterString));
        this.filteredData = filteredData;
    }
}
