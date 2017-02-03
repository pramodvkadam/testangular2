import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MyDatePickerModule} from "mydatepicker";
import {TranslateModule} from "ng2-translate";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {DataTableModule} from "angular2-datatable";
import {SafeHtmlPipe} from "./safe-html.pipe";
import {Nl2brPipe} from "./nl2br.pipe";
import {DocumentListComponent} from "./document-list/document-list.component";
import {DownloadComponent} from "./download/download.component";
import {FileUploadModule} from "ng2-file-upload";
import {ModalModule} from "ngx-modal";
import {DropdownModule} from "primeng/components/dropdown/dropdown";

@NgModule({
    exports: [
        CommonModule,
        ModalModule,
        ReactiveFormsModule,
        Ng2BootstrapModule,
        TranslateModule,
        DataTableModule,
        SafeHtmlPipe,
        Nl2brPipe,
        DocumentListComponent,
        DownloadComponent,
        FileUploadModule,
        MyDatePickerModule,
        DropdownModule
    ],
    imports: [DataTableModule, CommonModule],
    declarations: [SafeHtmlPipe, Nl2brPipe, DocumentListComponent, DownloadComponent]
})
export class SharedModule {
}
