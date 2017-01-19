import {Component, OnInit} from "@angular/core";
import {ToastsManager} from "ng2-toastr";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {TodoService} from "./todo.service";
import {AcsiService} from "../../shared/acsi.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {Todo} from "./todo";
import {AuthService} from "../../shared/auth.service";


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
        this.sub = this.route.params.subscribe(
            (params: any) => {
                if (params.hasOwnProperty('todoId')) {
                    this.todoId = params['todoId'];
                    this.isNew = false;
                    this.todoService.getTodoById(this.todoId).subscribe((todo: Todo) => {
                        this.todo = todo || this.todo;
                        this.initForm();
                    });
                } else {
                    this.todo.TodoDate = new Date();
                    this.todo.OwnerName = this.authService.getLoggedInUser();

                    this.isNew = true;
                    this.qSub = this.route
                        .queryParams
                        .subscribe((params: Params) => {
                            this.todo.TaskEntityId = (params['accountId']) ? params['accountId'] : '';
                            this.todo.TaskEntityType = (params['accountId']) ? 1 : 0;
                            this.todo.EntityId = (params['accountId']) ? params['accountId'] : '';
                            this.todo.EntityType = (params['taskEntityType']);
                            this.todo.OwnerId = "";
                            this.todo.Priority = "1";
                            this.todo.StatusCode = "0";
                            this.todo.IsDone = false;
                        });;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                    this.initForm();
                }
            });;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

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


    initForm() {

    }

}
