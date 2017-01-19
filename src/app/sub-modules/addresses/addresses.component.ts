import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Address} from "./address";
import {AddressService} from "./address.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'acsi-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

    entityType: number;
    private subscription: Subscription;
    private entityNumber: number;
    private addresses: Address[];
    private filteredData: Array<Address>;
    private fields: any;
    collapsed: boolean = false;
    collapsedMail: string;

    constructor(private addressService: AddressService,
                private router: Router,
                private route: ActivatedRoute,
                public toastr: ToastsManager) {
        this.addressService.addressUpdateEvent$.subscribe(() => {
            this.getData();
        });
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: Params) => {
                this.entityNumber = params['accountNumber'];
                this.entityType = Number(!this.entityNumber);
                this.fields = this.addressService.getAddressFields();
                this.getData();
            });
    }

    getData() {
        this.addressService.getAddressesByEntity(this.entityNumber, this.entityType).subscribe(
            (addresses: Address[]) => {
                this.filteredData = this.addresses = addresses;
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage || errors.Message, "Oops!");
            });
    }

    filterData(filterVal, column) {
        let filterString = filterVal ? filterVal.toLocaleLowerCase() : '';
        let filteredData: Array<Address> = this.addresses.filter((item: any) =>
            item[column].toLocaleLowerCase().match(filterString));
        this.filteredData = filteredData;
    }
}
