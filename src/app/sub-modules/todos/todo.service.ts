import {Injectable, EventEmitter} from "@angular/core";
import {HttpService} from "../../shared/http.service";
import {APP_CONFIG} from "../../shared/app.config";
import {Observable} from "rxjs";
import {Todo} from "./todo";
import {Response} from "@angular/http";

@Injectable()
export class TodoService {

    private apiUrl: string = "";
    private todoUrl: string = "";
    public todoUpdateEvent$: EventEmitter<any>;

    constructor(private http: HttpService) {
        this.apiUrl = `${APP_CONFIG.apiUrl}campsite/account/tasks/`;
        this.todoUrl = APP_CONFIG.apiUrl + "campsite/task/";
        this.todoUpdateEvent$ = new EventEmitter();
    }

    getTasksByEntity(entityNumber: number|string, entityType: number): Observable<Todo[]> {
        return this.http.get(`${this.apiUrl}${entityNumber}/${entityType}`)
            .map(this.extractData);
    }

    getTodosByEntity(entityNumber: number|string, entityType: number): Observable<Todo[]> {
        return this.http.get(`${this.todoUrl}gettasks/${entityType}/${entityNumber}`)
            .map(this.extractData);
    }

    saveTodo(todo: Todo) {
        let createOrUpdate = (todo.TaskId) ? 'update' : 'create';
        return this.http.put(`${this.todoUrl}${createOrUpdate}`, todo)
            .map(this.extractData);
    }

    getTodoById(todoId: number|string) {
        return this.http.get(`${this.todoUrl}${todoId}`)
            .map(this.extractData);
    }

    deleteTaskById(taskId: string) {
        return this.http.put(`${this.todoUrl}delete/${taskId}`, {})
            .map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {}
    }

    getTaskFields() {
        return [{
            field: "Action",
            title: "Action",
            linkTo: false,
            datatype: "command"
        }, {
            field: "ToDo",
            title: "ToDo",
            linkTo: false,
            filter: true,
        }, {
            field: "Owner",
            title: "Owner",
            linkTo: false,
            filter: true,
        }, {
            field: "LinkTo",
            title: "LinkTo",
            linkTo: false,
            filter: true,
        }, {
            field: "ToDoDate",
            title: "ToDo Date",
            linkTo: false,
            filter: true,
            valueFormatter: "date"
        },
            {
                field: "Status",
                title: "Status",
                linkTo: false,
                filter: true,
            }
        ];
    }

}
