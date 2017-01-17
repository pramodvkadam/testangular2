import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./shared/auth.guard";
import {HomeComponent} from "./home/home.component";

const APP_ROUTES: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', loadChildren: 'app/login/login.module#LoginModule'},
    {path: 'account', loadChildren: 'app/account/account.module#AccountModule'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);