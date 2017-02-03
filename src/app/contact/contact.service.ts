import {Injectable} from '@angular/core';
import {HttpService} from "../shared/http.service";
import {APP_CONFIG} from "../shared/app.config";
import {Response} from "@angular/http";

@Injectable()
export class ContactService {

    private apiUrl: string = "";

    constructor(private http: HttpService) {
        this.apiUrl = `${APP_CONFIG.apiUrl}campsite/account/contact/`;
    }

    getContactByNumber(number: number) {
        return this.http.get(`${this.apiUrl}${number}`)
            .map((res: Response) => {
                return res.json()
            })
    }

}
