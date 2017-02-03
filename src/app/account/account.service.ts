import {Injectable} from "@angular/core";
import {HttpService} from "../shared/http.service";
import {APP_CONFIG} from "../shared/app.config";
import {Response} from "@angular/http";

@Injectable()
export class AccountService {

    private apiUrl: string = "";

    constructor(private http: HttpService) {
        this.apiUrl = `${APP_CONFIG.apiUrl}campsite/account/`;
    }

    getAccountByNumber(accountNumber: number|string) {
        return this.http.get(`${this.apiUrl}${accountNumber}`)
            .map((res: Response) => {
                return res.json()
            })
    }

    getContactByAccountId(number: string) {
        return this.http.get(`${this.apiUrl}contactpersonnames/${number}`)
            .map(response => response.json())
            .map(data => {
                return data;
            });
    }


}
