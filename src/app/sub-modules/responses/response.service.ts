import {Injectable, EventEmitter} from '@angular/core';
import {Response as Http_Response} from "@angular/http";
import {HttpService} from "../../shared/http.service";
import {APP_CONFIG} from "../../shared/app.config";
import {Observable} from "rxjs";
import {Response} from "./response";

@Injectable()
export class ResponseService {

    private apiUrl: string = "";
    private responseUrl: string = "";
    public responseUpdateEvent$: EventEmitter<any>;

    constructor(private http: HttpService) {
        this.apiUrl = `${APP_CONFIG.apiUrl}campsite/account/responses/`;
        this.responseUrl = APP_CONFIG.apiUrl + "campsite/response/";
        this.responseUpdateEvent$ = new EventEmitter();
    }

    getResponsesByEntity(entityNumber: number, entityType: number): Observable<Response[]> {
        return this.http.get(`${this.apiUrl}${entityNumber}/${entityType}`)
            .map(this.extractData);
    }

    saveResponse(response: Response) {
        let createOrUpdate = (response.ResponseId) ? 'update' : 'create';
        return this.http.put(`${this.responseUrl}${createOrUpdate}`, response)
            .map(this.extractData);
    }

    getResponseById(responseId: number|string) {
        return this.http.get(`${this.responseUrl}${responseId}`)
            .map(this.extractData);
    }

    private extractData(res: Http_Response) {
        let body = res.json();
        return body || {}
    }

    getResponsesFields() {
        return [{
            field: "Action",
            title: "Action",
            linkTo: false,
            datatype: "command"
        }, {
            field: "Code",
            title: "Action Code",
            linkTo: false,
            filter: true,
            sortable: "Code",
            //getValue: normalValue
        }, {
            field: "ResponseCode",
            title: "Response Code",
            linkTo: false,
            filter: true,
            sortable: "Code",
            //getValue: normalValue
        }, {
            field: "CrossCode",
            title: "CrossCode",
            linkTo: false,
            filter: true,
            sortable: "CrossCode",
            //getValue: normalValue
        }, {
            field: "Name",
            title: "Description",
            linkTo: false,
            filter: true,
            sortable: "Name",
            //getValue: normalValue
        }, {
            field: "LinkTo",
            title: "LinkTo",
            linkTo: {url: "/contact", param: "LinkToContactSourceKey"},
            filter: true,
            //getValue: normalValue
        }, {
            field: "Date",
            title: "Date",
            linkTo: false,
            filter: true,
            //getValue: evaluatedValue,
            valueFormatter: "date"
        }];
    }

}
