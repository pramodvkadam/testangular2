import {Component, OnInit} from "@angular/core";
import {Memo} from "./memo";
import {Subscription} from "rxjs";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {MemoService} from "./memo.service";
import {EntityType} from "../../shared/entity-type.enum";

@Component({
    selector: 'acsi-memos',
    templateUrl: './memos.component.html',
    styleUrls: ['./memos.component.css']
})
export class MemosComponent implements OnInit {

    entityType: number;
    private subscription: Subscription;
    private entityNumber: number;
    private memos: Memo[];
    private filteredData: Array<Memo>;
    private fields: any;

    constructor(private memoService: MemoService,
                private router: Router,
                private route: ActivatedRoute,
                public toastr: ToastsManager) {
        this.memoService.memoUpdateEvent$.subscribe(() => {
            this.getData();
        });
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: Params) => {
                this.entityType = this.route.snapshot.parent.data['entityType'];
                this.entityNumber = this.entityType === EntityType.Account ?
                    params['accountNumber'] : params['contactNumber'];
                this.fields = this.memoService.getMemosFields();
                this.getData();
            });
    }

    getData() {
        this.memoService.getMemosByEntity(this.entityNumber, this.entityType).subscribe(
            (memos: Memo[]) => {
                this.filteredData = this.memos = memos;
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage || errors.Message, "Oops!");
            });
    }

    filterData(filterVal, column) {
        let filterString = filterVal ? filterVal.toLocaleLowerCase() : '';
        let filteredData: Array<Memo> = this.memos.filter((item: any) =>
            item[column].toLocaleLowerCase().match(filterString));
        this.filteredData = filteredData;
    }
}
