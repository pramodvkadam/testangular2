import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule} from "ng2-modal";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login.component";
import {loginsRouting} from "./login.routes";


@NgModule({
    imports: [
        CommonModule,
        loginsRouting,
        ModalModule,
        ReactiveFormsModule

    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
