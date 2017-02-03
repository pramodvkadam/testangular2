import {Component, OnInit} from "@angular/core";
import {AttributeService} from "./attribute.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {Attribute} from "./attribute";
import {Subscription} from "rxjs";
import {EntityType} from "../../shared/entity-type.enum";

@Component({
    selector: 'acsi-attributes',
    templateUrl: './attributes.component.html',
    styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {

    private attributes: Attribute[];
    private filteredData: Attribute[];
    private fields: any;
    entityType: number;
    private subscription: Subscription;
    private entityNumber: number;

    constructor(private attributeService: AttributeService,
                private router: Router,
                private route: ActivatedRoute,
                public toastr: ToastsManager) {
        this.attributeService.attributeUpdateEvent$.subscribe(() => {
            this.getData();
        });
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: Params) => {
                this.entityType = this.route.snapshot.parent.data['entityType'];
                this.entityNumber = this.entityType === EntityType.Account ?
                    params['accountNumber'] : params['contactNumber'];
                this.fields = this.attributeService.getAttributesFields();
                this.getData();
            });
    }

    getData() {
        this.attributeService.getAttributesByEntity(this.entityNumber, this.entityType).subscribe(
            (attributes: Attribute[]) => {
                this.filteredData = this.attributes = attributes;
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage || errors.Message, "Oops!");
            });
    }

    filterData(filterVal, column) {
        let filterString = filterVal ? filterVal.toLocaleLowerCase() : '';
        let filteredData: Array<Attribute> = this.attributes.filter((item: any) =>
            item[column].toLocaleLowerCase().match(filterString));
        this.filteredData = filteredData;
    }

}
