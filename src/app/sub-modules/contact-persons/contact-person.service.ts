import {Injectable, EventEmitter} from "@angular/core";
import {Response} from "@angular/http";
import {HttpService} from "../../shared/http.service";
import {APP_CONFIG} from "../../shared/app.config";
import {Observable} from "rxjs";
import {ContactPerson} from "./contact-person";

@Injectable()
export class ContactPersonService {

    private apiUrl: string = "";
    private contactPersonUrl: string = "";
    private contactPersonAccountUrl: string;
    public contactUpdateEvent$: EventEmitter<any>;

    constructor(private http: HttpService) {
        this.apiUrl = `${APP_CONFIG.apiUrl}campsite/account/contact-persons/`;

        this.contactPersonAccountUrl = APP_CONFIG.apiUrl + "campsite/account/contact/";
        this.contactPersonUrl = APP_CONFIG.apiUrl + "campsite/contact/";
        this.contactUpdateEvent$ = new EventEmitter();
    }

    getContactPersonesByEntity(entityNumber: number, entityType: number): Observable<ContactPerson[]> {
        return this.http.get(`${this.apiUrl}${entityNumber}/${entityType}`)
            .map(this.extractData);
    }

    saveContactPerson(contactPerson: ContactPerson, isAccount: boolean, isNew: boolean) {
        let createOrUpdate = (!isNew) ? 'update' : 'create';
        let url = isAccount ? this.contactPersonAccountUrl : this.contactPersonUrl;
        return this.http.put(`${url}${createOrUpdate}`, contactPerson)
            .map(this.extractData);
    }

    getContactPersonById(contactPersonId: number|string) {
        return this.http.get(`${this.contactPersonAccountUrl}info/${contactPersonId}`)
            .map(this.extractData);
    }

    validateContactPerson(contactPerson: Object) {
        return this.http.put(`${this.contactPersonAccountUrl}validateinfo`, contactPerson)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {}
    }

    getContactPersonsFields() {
        return [{
            field: "Action",
            title: "Action",
            linkTo: false,
            datatype: "command"
        }, {
            field: "Status",
            title: "Status",
            linkTo: false,
            sortable: "Year",
            filter: true,
        }, {
            field: "FullName",
            title: "Full Name",
            sortable: "JobTitle",
            filter: true,
            linkTo: {url: "/contact", param: "SourceKey"},
        }, {
            field: "JobTitle",
            title: "Job Title",
            sortable: "JobTitle",
            filter: true,
            linkTo: false,
        }, {
            field: "Department",
            title: "Department",
            sortable: "JobTitle",
            filter: true,
            linkTo: false,
        }, {
            field: "EmailAddress",
            title: "Email Address",
            linkTo: false,
            sortable: "IsExcursionPrinter",
            filter: true,
        }, {
            field: "MobilePhone",
            title: "Mobile No",
            linkTo: false,
            sortable: "MobilePhone",
            filter: true,
        }];
    }
}
