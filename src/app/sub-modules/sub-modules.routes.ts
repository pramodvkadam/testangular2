import {Routes, RouterModule} from "@angular/router";
import {EmailsComponent} from "./emails/emails.component";
import {AddressesComponent} from "./addresses/addresses.component";
import {ContactPersonsComponent} from "./contact-persons/contact-persons.component";
import {DocumentsComponent} from "./documents/documents.component";
import {MemosComponent} from "./memos/memos.component";
import {AttributesComponent} from "./attributes/attributes.component";
import {ResponsesComponent} from "./responses/responses.component";
import {TasksComponent} from "./tasks/tasks.component";
import {EditAddressComponent} from "./addresses/edit-address.component";
import {EditContactPersonComponent} from "./contact-persons/edit-contact-person.component";
import {UploadDocumentComponent} from "./documents/upload-document/upload-document.component";

const MODULE_ROUTES: Routes = [
    {
        path: '', redirectTo: 'emails', pathMatch: 'full'
    },
    {path: 'emails', component: EmailsComponent},
    {
        path: 'addresses', component: AddressesComponent, children: [
        {path: 'add', component: EditAddressComponent},
        {path: ':addressId', component: EditAddressComponent}
    ]
    },
    {
        path: 'contact-persons', component: ContactPersonsComponent, children: [
        {path: 'add', component: EditContactPersonComponent},
        {path: ':contactId', component: EditContactPersonComponent}]
    },
    {
        path: 'documents', component: DocumentsComponent, children: [
        {path: 'upload', component: UploadDocumentComponent}]
    },
    {path: 'memos', component: MemosComponent},
    {path: 'attributes', component: AttributesComponent},
    {path: 'responses', component: ResponsesComponent},
    {path: 'tasks', component: TasksComponent}

];

export const moduleRouting = RouterModule.forChild(MODULE_ROUTES);
