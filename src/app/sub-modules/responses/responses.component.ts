import {Component, OnInit} from "@angular/core";
import {Response} from "./response";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {ResponseService} from "./response.service";
import {Subscription} from "rxjs";
import {EntityType} from "../../shared/entity-type.enum";

@Component({
    selector: 'acsi-responses',
    templateUrl: './responses.component.html',
    styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

    private responses: Response[];
    private filteredData: Response[];
    private fields: any;
    entityType: number;
    private subscription: Subscription;
    private entityNumber: number;

    constructor(private responseService: ResponseService,
                private router: Router,
                private route: ActivatedRoute,
                public toastr: ToastsManager) {
        this.responseService.responseUpdateEvent$.subscribe(() => {
            this.getData();
        });
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: Params) => {
                this.entityType = this.route.snapshot.parent.data['entityType'];
                this.entityNumber = this.entityType === EntityType.Account ?
                    params['accountNumber'] : params['contactNumber'];
                this.fields = this.responseService.getResponsesFields();
                this.getData();
            });
    }

    getData() {
        this.responseService.getResponsesByEntity(this.entityNumber, this.entityType).subscribe(
            (responses: Response[]) => {
                this.filteredData = this.responses = responses;
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage || errors.Message, "Oops!");
            });
    }

    filterData(filterVal, column) {
        let filterString = filterVal ? filterVal.toLocaleLowerCase() : '';
        let filteredData: Array<Response> = this.responses.filter((item: any) =>
            item[column].toLocaleLowerCase().match(filterString));
        this.filteredData = filteredData;
    }
}
