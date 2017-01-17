import {NgModule} from "@angular/core";
import {SubModulesComponent} from "./sub-modules.component";
import {SharedModule} from "../shared/shared.module";
import {moduleRouting} from "./sub-modules.routes";
import {EmailsComponent} from "./emails/emails.component";
import {AddressesComponent} from "./addresses/addresses.component";
import {ContactPersonsComponent} from "./contact-persons/contact-persons.component";
import {DocumentsComponent} from "./documents/documents.component";
import {MemosComponent} from "./memos/memos.component";
import {AttributesComponent} from "./attributes/attributes.component";
import {ResponsesComponent} from "./responses/responses.component";
import {TasksComponent} from "./tasks/tasks.component";
import {TodosComponent} from "./todos/todos.component";
import {NotesComponent} from "./memos/notes.component";
import {EmailService} from "./emails/email.service";
import {AddressService} from "./addresses/address.service";
import {EditAddressComponent} from "./addresses/edit-address.component";
import {ContactPersonService} from "./contact-persons/contact-person.service";
import {EditContactPersonComponent} from "./contact-persons/edit-contact-person.component";

@NgModule({
    imports: [
        SharedModule,
        moduleRouting
    ],
    declarations: [SubModulesComponent, EmailsComponent,
        AddressesComponent,
        ContactPersonsComponent,
        DocumentsComponent,
        MemosComponent,
        AttributesComponent,
        ResponsesComponent,
        TasksComponent,
        TodosComponent,
        NotesComponent,
        EditAddressComponent,
        EditContactPersonComponent
    ],
    providers: [EmailService, AddressService, ContactPersonService]
})
export class SubModulesModule {
}
