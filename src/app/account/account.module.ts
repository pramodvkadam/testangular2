import {NgModule} from "@angular/core";
import {AccountComponent} from "./account.component";
import {SharedModule} from "../shared/shared.module";
import {accountRouting} from "./account.routes";
import {AccountService} from "./account.service";
import {AccountDetailsComponent} from "./account-details.component";
import {AccountDetailResolveService} from "./account-detail-resolve.service";
import {EditAccountComponent} from "./edit-account/edit-account.component";
import {DocumentServiceService} from "../sub-modules/documents/document-service.service";

@NgModule({
    imports: [
        SharedModule,
        accountRouting
    ],
    providers: [AccountService, AccountDetailResolveService, DocumentServiceService],
    declarations: [AccountComponent, AccountDetailsComponent, EditAccountComponent]
})
export class AccountModule {
}
