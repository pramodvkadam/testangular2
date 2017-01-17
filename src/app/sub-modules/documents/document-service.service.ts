import {Injectable, EventEmitter} from "@angular/core";
import {HttpService} from "../../shared/http.service";
import {APP_CONFIG} from "../../shared/app.config";
import {Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class DocumentServiceService {

    private apiUrl: string = "";
    private documentUrl: string = "";
    private documentAccountUrl: string;
    public documentUpdateEvent$: EventEmitter<any>;

    constructor(private http: HttpService) {
        this.apiUrl = `${APP_CONFIG.apiUrl}campsite/account/documents/`;

        this.documentAccountUrl = APP_CONFIG.apiUrl + "campsite/account/document/";
        this.documentUrl = APP_CONFIG.apiUrl + "campsite/document/";
        this.documentUpdateEvent$ = new EventEmitter();
    }

    getDocumentsByEntity(entityNumber: number, entityType: number): Observable<Document[]> {
        return this.http.get(`${this.apiUrl}${entityNumber}/${entityType}`)
            .map(this.extractData);
    }

    deleteDocumentById(documentId: string) {
        return this.http.put(`${this.documentUrl}delete/${documentId}`, {})
            .map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {}
    }

    getDocumentById(documentId: string, type: string, isSourceCrm2011: boolean = false) {

        let documentUrl = (type === 'document') ? `${this.documentUrl}${documentId}` : `${APP_CONFIG.apiUrl}campsite/activityattachment/${documentId}/${isSourceCrm2011}`;

        return this.http.get(documentUrl)
            .map(this.extractData);
    }

    base64ToBlobConvert(data: any) {
        // decode base64 string, remove space for IE compatibility
        var binary = atob(data.Data.replace(/\s/g, ''));

        // get binary length
        var len = binary.length;

        // create ArrayBuffer with binary length
        var buffer = new ArrayBuffer(len);

        // create 8-bit Array
        var view = new Uint8Array(buffer);

        // save unicode of binary data into 8-bit Array
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }

        return new Blob([view], {type: data.FileType});
    }

    getDocumentsFields() {
        return [{
            field: "Action",
            title: "Action",
            linkTo: false,
            datatype: "command"
        }, {
            field: "FileType",
            title: "FileType",
            linkTo: false,
            sortable: "FileType",
            filter: false,
        }, {
            field: "Size",
            title: "Size",
            linkTo: false,
            sortable: "Size",
            filter: false,
        }, {
            field: "Name",
            title: "Name",
            linkTo: false,
            filter: true,
            sortable: "Name",
        }, {
            field: "Label",
            title: "Label",
            linkTo: false,
            filter: true,
            sortable: "Label",
        }, {
            field: "CreatedBy",
            title: "Created By",
            linkTo: false,
            filter: true,
            sortable: "CreatedBy",
        }, {
            field: "CreatedDate",
            title: "Created Date",
            linkTo: false,
            filter: true,
            sortable: "CreatedDate",
            valueFormatter: "date"
        }, {
            field: "SecurityLevel",
            title: "Security Level",
            linkTo: false,
            filter: true,
            sortable: "SecurityLevel",
        }, {
            field: "FilePath",
            title: "File Path",
            linkTo: false,
            filter: true,
            sortable: "FilePath",
        }];
    }
}
