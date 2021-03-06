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
import {TodosComponent} from "./todos/todos.component";
import {NotesComponent} from "./memos/notes.component";
import {EmailService} from "./emails/email.service";
import {AddressService} from "./addresses/address.service";
import {EditAddressComponent} from "./addresses/edit-address.component";
import {ContactPersonService} from "./contact-persons/contact-person.service";
import {EditContactPersonComponent} from "./contact-persons/edit-contact-person.component";
import {UploadDocumentComponent} from "./documents/upload-document/upload-document.component";
import {MemoService} from "./memos/memo.service";
import {EditMemoComponent} from "./memos/edit-memo/edit-memo.component";
import {TodoService} from "./todos/todo.service";
import {EditTodoComponent} from "./todos/edit-todo.component";
import {AttributeService} from "./attributes/attribute.service";
import {EditAttributeComponent} from './attributes/edit-attribute/edit-attribute.component';
import {EditResponseComponent} from './responses/edit-response/edit-response.component';
import {ResponseService} from "./responses/response.service";
import {TodoListComponent} from './todos/todo-list.component';


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
        TodosComponent,
        NotesComponent,
        EditAddressComponent,
        EditContactPersonComponent,
        UploadDocumentComponent,
        EditMemoComponent,
        NotesComponent,
        EditTodoComponent,
        EditAttributeComponent,
        EditResponseComponent,
        TodoListComponent
    ],
    providers: [EmailService,
        AddressService,
        ContactPersonService,
        MemoService,
        AttributeService,
        ResponseService,
        TodoService]
})
export class SubModulesModule {
}
