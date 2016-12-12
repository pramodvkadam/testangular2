import {Routes, RouterModule} from "@angular/router";
import {EmailsComponent} from "./emails/emails.component";
import {AddressesComponent} from "./addresses/addresses.component";
import {ContactPersonsComponent} from "./contact-persons/contact-persons.component";
import {DocumentsComponent} from "./documents/documents.component";
import {MemosComponent} from "./memos/memos.component";
import {AttributesComponent} from "./attributes/attributes.component";
import {ResponsesComponent} from "./responses/responses.component";
import {TasksComponent} from "./tasks/tasks.component";

const MODULE_ROUTES: Routes = [
    {
        path: '', redirectTo: 'emails', pathMatch: 'full'
    },
    {path: 'emails', component: EmailsComponent},
    {path: 'addresses', component: AddressesComponent},
    {path: 'contact-persons', component: ContactPersonsComponent},
    {path: 'documents', component: DocumentsComponent},
    {path: 'memos', component: MemosComponent},
    {path: 'attributes', component: AttributesComponent},
    {path: 'responses', component: ResponsesComponent},
    {path: 'tasks', component: TasksComponent}

];

export const moduleRouting = RouterModule.forChild(MODULE_ROUTES);
