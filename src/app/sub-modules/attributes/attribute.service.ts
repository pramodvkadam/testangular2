import {Injectable, EventEmitter} from '@angular/core';
import {HttpService} from "../../shared/http.service";
import {APP_CONFIG} from "../../shared/app.config";
import {Observable} from "rxjs";
import {Attribute} from "./attribute";
import {Response} from "@angular/http";

@Injectable()
export class AttributeService {

    private apiUrl: string = "";
    private attributeUrl: string = "";
    public attributeUpdateEvent$: EventEmitter<any>;

    constructor(private http: HttpService) {
        this.apiUrl = `${APP_CONFIG.apiUrl}campsite/account/attributes/`;
        this.attributeUrl = APP_CONFIG.apiUrl + "campsite/organizationattribute/";
        this.attributeUpdateEvent$ = new EventEmitter();
    }

    getAttributesByEntity(entityNumber: number, entityType: number): Observable<Attribute[]> {
        return this.http.get(`${this.apiUrl}${entityNumber}/${entityType}`)
            .map(this.extractData);
    }

    saveAttribute(attribute: Attribute) {
        let createOrUpdate = (attribute.AttributeId) ? 'update' : 'create';
        return this.http.put(`${this.attributeUrl}${createOrUpdate}`, attribute)
            .map(this.extractData);
    }

    getAttributeById(attributeId: number|string) {
        return this.http.get(`${this.attributeUrl}${attributeId}`)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {}
    }

    getAttributesFields() {
        return [{
            field: "Action",
            title: "Action",
            linkTo: false,
            datatype: "command"
        }, {
            field: "Code",
            title: "Code",
            linkTo: false,
            filter: {Code: "text"},
            sortable: "Code",
        }, {
            field: "Description",
            title: "Description",
            linkTo: false,
            filter: true,
            sortable: "Description",
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
            sortable: "ModifiedBy",
        }, {
            field: "ModifiedOn",
            title: "Modified On",
            linkTo: false,
            filter: true,
            sortable: "ModifiedOn",
            valueFormatter: "date"
        }];
    }
}
