import {Component, OnInit, Input} from "@angular/core";
import {Todo} from "./todo";
import {AcsiService} from "../../shared/acsi.service";
import {TodoService} from "./todo.service";
import {ToastsManager} from "ng2-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'acsi-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

    @Input()
    taskEntityType: number;
    @Input()
    taskEntityId: number|any;
    @Input()
    entityType: number;
    @Input()
    entityId: string;
    todo: Todo;
    taksPriorities: any[] = [];
    taksStatuses: any[] = [];
    users: any[] = [];
    datePickerOpen: boolean;
    active: boolean = false;
    todos: Todo[] = [];

    constructor(private acsiService: AcsiService, private todoService: TodoService,
                public router: Router,
                public route: ActivatedRoute,
                public toastr: ToastsManager) {
        this.todoService.todoUpdateEvent$.subscribe((event: boolean) => {
            this.getTodos();
        })
    }

    ngOnInit() {
        this.getTodos();
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

    getTodos() {
        this.todoService.getTodosByEntity(this.taskEntityId, this.taskEntityType)
            .subscribe((todos: Todo[]) => {
                this.todos = todos;
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage);
            });
    }

    getOwnerName(userId: string) {
        if (!userId || !this.users.length) {
            return "N/A"
        }
        return this.users.find(user => {
                return user.Id === userId
            }).Name || "N/A";
    }

    getStatusName(statusId: string) {
        if (!statusId || !this.taksStatuses.length) {
            return "N/A"
        }
        return this.taksStatuses.find(status => {
                return Number(status.Id) === Number(statusId)
            }).Name || "N/A";
    }

    getPriorityName(priorityId: string) {
        if (!this.taksPriorities.length || priorityId == "") {
            return "N/A"
        } else {
            return this.taksPriorities.find((priority: any) => {
                    return Number(priority.Id) === Number(priorityId)
                }).Name || "N/A";
        }
    }

    deleteTask(taskId: string, index: number) {
        let confirmation = confirm("Are you sure to delete Task!");
        if (confirmation) {
            this.todoService.deleteTaskById(taskId)
                .subscribe((response: any) => {
                    if (response === true) {
                        this.todos.splice(index, 1);
                        this.toastr.info("Task deleted successfully!");
                    }
                }, (error: any) => {
                    let errors = error.json();
                    this.toastr.error(errors.ExceptionMessage);
                })
        }
    }

    editTodo(todoId: string) {
        this.todo = todoId;
        this.router.navigate(['todo', todoId], {relativeTo: this.route, preserveQueryParams: true})
    }

}
