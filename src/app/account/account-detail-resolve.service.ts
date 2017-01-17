import {Injectable} from "@angular/core";
import {Router, Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {AccountInfo} from "./account-info";
import {AccountService} from "./account.service";

@Injectable()
export class AccountDetailResolveService implements Resolve<AccountInfo> {

    constructor(private accountService: AccountService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        let accountNumber = route.params['accountNumber'];
        return this.accountService.getAccountByNumber(accountNumber);
    }
}
