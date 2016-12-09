import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule} from "ng2-modal";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "ng2-translate";
import {Ng2BootstrapModule} from "ng2-bootstrap";

@NgModule({
    exports: [
        CommonModule,
        ModalModule,
        ReactiveFormsModule,
        Ng2BootstrapModule,
        TranslateModule
    ]
})
export class SharedModule {
}
