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
    }

    ngOnInit() {
        this.todoService.getTodosByEntity(this.taskEntityId, this.taskEntityType)
            .subscribe(tasks => this.todos = tasks,
                error => {
                    let errors = error.json();
                    this.toastr.error(errors.ExceptionMessage);
                });
    }

}
