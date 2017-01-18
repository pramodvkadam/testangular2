import {Injectable, EventEmitter} from "@angular/core";
import {APP_CONFIG} from "../../shared/app.config";
import {HttpService} from "../../shared/http.service";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {Address} from "./address";

@Injectable()
export class AddressService {

    private apiUrl: string = "";
    private addressUrl: string = "";
    public addressUpdateEvent$: EventEmitter<any>;

    constructor(private http: HttpService) {
        this.apiUrl = `${APP_CONFIG.apiUrl}campsite/account/addresses/`;
        this.addressUrl = `${APP_CONFIG.apiUrl}campsite/address/`;
        this.addressUpdateEvent$ = new EventEmitter();
    }

    getAddressesByEntity(entityNumber: number, entityType: number): Observable<Address[]> {
        return this.http.get(`${this.apiUrl}${entityNumber}/${entityType}`)
            .map(this.extractData);
    }

    saveAddress(address: Address) {
        let createOrUpdate = (address.AddressId) ? 'update' : 'create';
        return this.http.put(`${this.addressUrl}${createOrUpdate}`, address)
            .map(this.extractData);
    }

    getAddressById(addressId: number|string) {
        return this.http.get(`${this.addressUrl}info/${addressId}`)
            .map(this.extractData);
    }

    validateAddress(address: Object) {
        return this.http.put(`${this.addressUrl}validateinfo`, address)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {}
    }

    getAddressFields() {
        return [{
            field: "Action",
            title: "Action",
            linkTo: false,
            datatype: "command"
        }, {
            field: "Type",
            title: "Type",
            linkTo: false,
            filter: true,
            sortable: "Type",
            //////////getValue: normalValue
        }, {
            field: "Street",
            title: "Street",
            linkTo: false,
            filter: true,
            sortable: "AddressLine",
            //////////getValue: normalValue
        }, {
            field: "PostBoxNumber",
            title: "PostBox Number",
            linkTo: false,
            filter: true,
            sortable: "PostBoxNumber",
            //////////getValue: normalValue
        }, {
            field: "HouseNumber",
            title: "House Number",
            linkTo: false,
            sortable: "HouseNumber",
            filter: true,
            //////////getValue: normalValue
        }, {
            field: "PostalCode",
            title: "PostalCode",
            linkTo: false,
            sortable: "PostalCode",
            filter: true,
            //////////getValue: normalValue
        }, {
            field: "City",
            title: "City",
            linkTo: false,
            filter: true,
            sortable: "City",
            //////////getValue: normalValue
        }, {
            field: "Country",
            title: "Country",
            linkTo: false,
            filter: true,
            sortable: "Country",
            //////////getValue: normalValue
        }, {
            field: "LinkedTo",
            title: "LinkedTo",
            linkTo: false,
            sortable: "LinkedTo",
            filter: true,
            //////////getValue: normalValue
        }, {
            field: "ModifiedDate",
            title: "Modified Date",
            linkTo: false,
            filter: true,
            sortable: "ModifiedDate",
            //////////getValue: evaluatedValue,
            valueFormatter: "date"
        }];
    }
}
