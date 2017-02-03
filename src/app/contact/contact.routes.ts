import {Routes, RouterModule} from "@angular/router";
import {ContactComponent} from "./contact.component";
import {ContactDetailService} from "./contact-detail.service";


const ACCOUNT_ROUTES: Routes = [
    {
        path: '', component: ContactComponent,
        children: [
            {
                path: ":contactNumber", component: ContactComponent, children: [
                {path: '', loadChildren: 'app/sub-modules/sub-modules.module#SubModulesModule'}
            ],
                resolve: {
                    contactInfo: ContactDetailService
                }
            }
        ]
    }
];

export const accountRouting = RouterModule.forChild(ACCOUNT_ROUTES);
