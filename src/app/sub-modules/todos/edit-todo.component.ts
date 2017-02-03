import {Component, OnInit} from "@angular/core";
import {ToastsManager} from "ng2-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoService} from "./todo.service";
import {AcsiService} from "../../shared/acsi.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {Todo} from "./todo";
import {AuthService} from "../../shared/auth.service";
import {TaskEntityType} from "./task-entity-type.enum";
import {EntityType} from "../../shared/entity-type.enum";


@Component({
    selector: 'acsi-edit-todo',
    templateUrl: './edit-todo.component.html',
    styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {
    private users: any[];
    private taksPriorities: any[];
    private taksStatuses: any[];
    todoForm: FormGroup;
    private qSub: Subscription;
    private sub: Subscription;
    private todoId: any;
    private isNew: boolean;
    private todo: Todo;

    constructor(private acsiService: AcsiService,
                private todoService: TodoService,
                private authService: AuthService,
                private _formBuilder: FormBuilder,
                public router: Router,
                public route: ActivatedRoute,
                public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.todo = new Todo();
        this.sub = this.route.params.subscribe(
            (params: any) => {
                if (params.hasOwnProperty('todoId')) {
                    this.todoId = params['todoId'];
                    this.isNew = false;
                    this.todoService.getTodoById(this.todoId).subscribe((todo: Todo) => {
                        this.todo = todo || this.todo;
                    });
                } else {
                    this.todo.TodoDate = new Date();
                    this.todo.OwnerName = this.authService.getLoggedInUser();
                    this.isNew = true;
                    let taskEntityType = this.route.snapshot.parent.data['taskEntityType'];
                    let taskEntityIdVal = (taskEntityType === TaskEntityType.Memo) ?
                        'memoId' : (taskEntityType === TaskEntityType.OrganizationAttribute) ?
                            'attributeId' : 'responseId';
                    this.todo.TaskEntityId = this.route.snapshot.parent.params[taskEntityIdVal];
                    this.todo.TaskEntityType = taskEntityType;
                    this.todo.EntityType = this.route.snapshot.parent.parent.data['entityType'];
                    console.log(this.route.snapshot.parent.parent.params['accountNumber']);
                    this.todo.EntityId = this.todo.EntityType === EntityType.Account ?
                        this.route.snapshot.parent.parent.data['accountInfo'].Id :
                        this.route.snapshot.parent.parent.data['contactInfo'].Id;
                    this.todo.OwnerId = "";
                    this.todo.Priority = "1";
                    this.todo.StatusCode = "0";
                    this.todo.IsDone = false;
                }
            });

        this.acsiService.getUsers().subscribe((users: any[]) => {
                this.users = users;
            },
            (error: any) => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage);
            });

        this.acsiService.getTaskPriorities().subscribe((priorities: any[]) => {
                this.taksPriorities = priorities;
            },
            (error: any) => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage);
            });

        this.acsiService.getTaskStatuses().subscribe((statuses: any[]) => {
            this.taksStatuses = statuses;
        }, (error: any) => {
            let errors = error.json();
            this.toastr.error(errors.ExceptionMessage);
        })
    }

    onTodoSubmit() {
        let todo = Object.assign({}, this.todo);
        todo.TodoDate = this.todo.TodoDate.formatted;
        this.todoService.saveTodo(todo)
            .subscribe((response: any) => {
                if (response) {
                    if (!this.todo.TaskId) {
                        this.todo.TaskId = response;
                        this.toastr.info("Todo added successfully!");

                    } else {
                        this.toastr.info("Todo updated successfully!");
                    }
                    this.todoService.todoUpdateEvent$.emit(true);
                    this.closeTodo();
                } else {
                    this.toastr.error(response.ExceptionMessage);
                }
            }, (error: any) => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage);
            });
    }

    closeTodo() {
        this.router.navigate(['../'], {relativeTo: this.route, preserveQueryParams: true});
    }

}
