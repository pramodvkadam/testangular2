import {Routes, RouterModule} from "@angular/router";
import {EmailsComponent} from "./emails/emails.component";
import {AddressesComponent} from "./addresses/addresses.component";
import {ContactPersonsComponent} from "./contact-persons/contact-persons.component";
import {DocumentsComponent} from "./documents/documents.component";
import {MemosComponent} from "./memos/memos.component";
import {AttributesComponent} from "./attributes/attributes.component";
import {ResponsesComponent} from "./responses/responses.component";
import {EditAddressComponent} from "./addresses/edit-address.component";
import {EditContactPersonComponent} from "./contact-persons/edit-contact-person.component";
import {UploadDocumentComponent} from "./documents/upload-document/upload-document.component";
import {EditMemoComponent} from "./memos/edit-memo/edit-memo.component";
import {EditTodoComponent} from "./todos/edit-todo.component";
import {TaskEntityType} from "./todos/task-entity-type.enum";
import {EditAttributeComponent} from "./attributes/edit-attribute/edit-attribute.component";
import {EditResponseComponent} from "./responses/edit-response/edit-response.component";
import {TodoListComponent} from "./todos/todo-list.component";

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
    {
        path: 'memos', component: MemosComponent, children: [
        {path: 'add', component: EditMemoComponent},
        {
            path: ':memoId', component: EditMemoComponent, children: [
            {path: 'todo', component: EditTodoComponent},
            {path: 'todo/:todoId', component: EditTodoComponent}],
            data: {
                taskEntityType: TaskEntityType.Memo
            }
        }]
    },
    {
        path: 'attributes', component: AttributesComponent, children: [
        {path: 'add', component: EditAttributeComponent},
        {
            path: ':attributeId', component: EditAttributeComponent, children: [
            {path: 'todo', component: EditTodoComponent},
            {path: 'todo/:todoId', component: EditTodoComponent}],
            data: {
                taskEntityType: TaskEntityType.OrganizationAttribute
            }
        }]
    },
    {
        path: 'responses', component: ResponsesComponent, children: [
        {path: 'add', component: EditResponseComponent},
        {
            path: ':responseId', component: EditResponseComponent, children: [
            {path: 'todo', component: EditTodoComponent},
            {path: 'todo/:todoId', component: EditTodoComponent}],
            data: {
                taskEntityType: TaskEntityType.Response
            }
        }]
    },
    {
        path: 'tasks', component: TodoListComponent
    }
];

export const moduleRouting = RouterModule.forChild(MODULE_ROUTES);
