import {Injectable, EventEmitter} from "@angular/core";
import {Response} from "@angular/http";
import {HttpService} from "../../shared/http.service";
import {APP_CONFIG} from "../../shared/app.config";
import {Observable} from "rxjs";
import {Memo} from "./memo";

@Injectable()
export class MemoService {

    private apiUrl: string = "";
    private memoUrl: string = "";
    public memoUpdateEvent$: EventEmitter<any>;

    constructor(private http: HttpService) {
        this.apiUrl = `${APP_CONFIG.apiUrl}campsite/account/memos/`;
        this.memoUrl = APP_CONFIG.apiUrl + "campsite/memo/";
        this.memoUpdateEvent$ = new EventEmitter();
    }

    getMemosByEntity(entityNumber: number, entityType: number): Observable<Memo[]> {
        return this.http.get(`${this.apiUrl}${entityNumber}/${entityType}`)
            .map(this.extractData);
    }

    saveMemo(memo: Memo) {
        let createOrUpdate = (memo.MemoId) ? 'update' : 'create';
        return this.http.put(`${this.memoUrl}${createOrUpdate}`, memo)
            .map(this.extractData);
    }

    getMemoById(memoId: number|string) {
        return this.http.get(`${this.memoUrl}/${memoId}`)
            .map(this.extractData);
    }

    getNotes(entityId: string) {
        return this.http.get(`${APP_CONFIG.apiUrl}campsite/notes/${entityId}`)
            .map(this.extractData);
    }

    saveNote(note: any) {
        return this.http.post(`${APP_CONFIG.apiUrl}campsite/note/create`, note)
            .map(this.extractData);
    }

    deleteNoteById(noteId: string) {
        return this.http.delete(`${APP_CONFIG.apiUrl}campsite/note/delete/${noteId}`)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {}
    }

    getMemosFields() {
        return [{
            field: "Action",
            title: "Action",
            linkTo: false,
            datatype: "command"
        }, {
            field: "Name",
            title: "Name",
            filter: true,
            linkTo: false,
            sortable: "Name",
        }, {
            field: "LinkTo",
            title: "LinkTo",
            linkTo: {url: "/contact", param: "LinkToContactSourceKey"},
            filter: true,
            sortable: "LinkTo",
        }, {
            field: "ModifiedBy",
            title: "Modified By",
            linkTo: false,
            filter: true,
            sortable: "ChangedBy",
        }, {
            field: "ModifiedOn",
            title: "Modified date",
            linkTo: false,
            filter: true,
            sortable: "ModifiedOn",
            valueFormatter: "date"
        }];
    }
}
