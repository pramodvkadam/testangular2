import {Routes, RouterModule} from "@angular/router";
import {AccountComponent} from "./account.component";
import {AccountDetailsComponent} from "./account-details.component";
import {AccountDetailResolveService} from "./account-detail-resolve.service";
import {EntityType} from "../shared/entity-type.enum";

const ACCOUNT_ROUTES: Routes = [
    {
        path: '', component: AccountComponent,
        children: [
            {
                path: ":accountNumber", component: AccountDetailsComponent, children: [
                {path: '', loadChildren: 'app/sub-modules/sub-modules.module#SubModulesModule'}
            ],
                resolve: {
                    accountInfo: AccountDetailResolveService
                },
                data: {
                    entityType: EntityType.Account
                }
            }
        ]
    }
];

export const accountRouting = RouterModule.forChild(ACCOUNT_ROUTES);
