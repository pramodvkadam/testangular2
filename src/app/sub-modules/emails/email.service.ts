import {Injectable} from "@angular/core";
import {HttpService} from "../../shared/http.service";
import {Response} from "@angular/http";
import {APP_CONFIG} from "../../shared/app.config";

@Injectable()
export class EmailService {

    private apiUrl: string = "";

    constructor(private http: HttpService) {
        this.apiUrl = `${APP_CONFIG.apiUrl}campsite/account/emails`;
    }

    getEmailsByEntity(entityNumber: number, entityType: number) {
        return this.http.get(`${this.apiUrl}/${entityNumber}/${entityType}`)
            .map(this.extractData);
    }

    getEmailFields() {
        return [{
            field: "Action",
            title: "Attachments",
            linkTo: false,
            datatype: "command"
        }, {
            field: "Subject",
            title: "Subject",
            linkTo: false,
            filter: true,
            sortable: "Description",
            ////////////getValue: normalValue
        }, {
            field: "Body",
            title: "Description",
            linkTo: false,
            collapsible: true,
            filter: true,
            sortable: "Description",
            ////////////getValue: normalValue
        }, {
            field: "Label",
            title: "Label",
            linkTo: false,
            sortable: "Label",
            filter: true,
            ////////////getValue: normalValue
        }, {
            field: "FromEmailAddress",
            title: "From",
            linkTo: false,
            filter: true,
            sortable: "Subject",
            ////////////getValue: normalValue
        }, {
            field: "ToEmailAddress",
            title: "To",
            linkTo: false,
            sortable: "Regarding",
            filter: true,
            ////////////getValue: normalValue
        }, {
            field: "Date",
            title: "Date",
            linkTo: false,
            filter: true,
            sortable: "ActualEnd",
            ////////////getValue: evaluatedValue,
            valueFormatter: "date"
        }];
    };

    private extractData(res: Response) {
        let body = res.json();
        return body || {}
    }
}
