import {Component, OnInit} from '@angular/core';
import {AcsiService} from "../../shared/acsi.service";
import {TodoService} from "./todo.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {Subscription} from "rxjs";
import {Todo} from "./todo";
import {TaskEntityType} from "./task-entity-type.enum";
import {EntityType} from "../../shared/entity-type.enum";

@Component({
    selector: 'acsi-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
    private entityNumber: number|string;
    private subscription: Subscription;
    private entityType: number;
    private fields: Array<any>;
    private filteredData: Array<Todo>;
    private todos: Todo[];

    constructor(private acsiService: AcsiService, private todoService: TodoService,
                public router: Router,
                public route: ActivatedRoute,
                public toastr: ToastsManager) {
        this.todoService.todoUpdateEvent$.subscribe((event: boolean) => {
            this.getTasks();
        })
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: Params) => {
                this.entityType = this.route.snapshot.parent.data['entityType'];
                this.entityNumber = this.entityType === EntityType.Account ?
                    params['accountNumber'] : params['contactNumber'];
                this.fields = this.todoService.getTaskFields();
                this.getTasks();
            });
    }

    getTasks() {
        this.todoService.getTasksByEntity(this.entityNumber, this.entityType).subscribe(
            (todos: Todo[]) => {
                this.filteredData = this.todos = todos;
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage || errors.Message, "Oops!");
            });
    }

    filterData(filterVal, column) {
        let filterString = filterVal ? filterVal.toLocaleLowerCase() : '';
        let filteredData: Array<Todo> = this.todos.filter((item: any) =>
            item[column].toLocaleLowerCase().match(filterString));
        this.filteredData = filteredData;
    }

    navigateToRelative(task: Todo) {
        let relativeTo = task.TaskEntityType == TaskEntityType.Memo ? 'memos' :
            task.TaskEntityType == TaskEntityType.OrganizationAttribute ? 'attributes' : 'responses';

        this.router.navigate(['../', relativeTo, task.TaskEntityId], {
            relativeTo: this.route,
            preserveQueryParams: true
        });
    }

}
