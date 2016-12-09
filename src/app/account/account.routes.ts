import {Routes, RouterModule} from "@angular/router";
import {AccountComponent} from "./account.component";

const ACCOUNT_ROUTES: Routes = [
    {
        path: ':accountNumber', component: AccountComponent,
        children: [
            {path: 'email'},
        ]
    }
];

export const accountRouting = RouterModule.forChild(ACCOUNT_ROUTES);
