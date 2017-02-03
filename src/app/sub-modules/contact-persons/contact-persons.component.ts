import {Component, OnInit} from "@angular/core";
import {ContactPersonService} from "./contact-person.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {ContactPerson} from "./contact-person";
import {Subscription} from "rxjs";
import {EntityType} from "../../shared/entity-type.enum";

@Component({
    selector: 'acsi-contact-persons',
    templateUrl: './contact-persons.component.html',
    styleUrls: ['./contact-persons.component.css']
})
export class ContactPersonsComponent implements OnInit {
    private fields: any;
    private subscription: Subscription;
    private entityNumber: any;
    private entityType: number;
    private filteredData: ContactPerson[];

    private contactPersons: ContactPerson[];
    private querySub: Subscription;
    private accountId: any;

    constructor(private contactPersonService: ContactPersonService,
                private router: Router,
                private route: ActivatedRoute,
                public toastr: ToastsManager) {
        this.contactPersonService.contactUpdateEvent$.subscribe(() => {
            this.getData();
        });
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: Params) => {
                this.entityType = this.route.snapshot.parent.data['entityType'];
                this.entityNumber = this.entityType === EntityType.Account ?
                    params['accountNumber'] : params['contactNumber'];
                this.fields = this.contactPersonService.getContactPersonsFields();
                this.getData();
            });
    }

    getData() {
        this.contactPersonService.getContactPersonesByEntity(this.entityNumber, this.entityType).subscribe(
            (addresses: ContactPerson[]) => {
                this.filteredData = this.contactPersons = addresses;
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage || errors.Message, "Oops!");
            })
    }

    filterData(filterVal, column) {
        let filterString = filterVal ? filterVal.toLocaleLowerCase() : '';
        let filteredData: Array<ContactPerson> = this.contactPersons.filter((item: any) =>
            item[column].toLocaleLowerCase().match(filterString));
        this.filteredData = filteredData;
    }

}
