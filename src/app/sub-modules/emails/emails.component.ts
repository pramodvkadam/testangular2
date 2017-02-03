import {Component, OnInit} from "@angular/core";
import {EmailService} from "./email.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {Subscription} from "rxjs";
import {Email} from "./email";
import {EntityType} from "../../shared/entity-type.enum";

@Component({
    selector: 'acsi-emails',
    templateUrl: './emails.component.html',
    styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

    entityType: number;
    private subscription: Subscription;
    private entityNumber: number;
    private emails: Email[];
    private filteredData: Array<Email>;
    private fields: any;
    collapsed: boolean = false;
    collapsedMail: string;

    constructor(private emailService: EmailService,
                private router: Router,
                private route: ActivatedRoute,
                public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: Params) => {
                this.entityType = this.route.snapshot.parent.data['entityType'];
                this.entityNumber = this.entityType === EntityType.Account ?
                    params['accountNumber'] : params['contactNumber'];
                this.fields = this.emailService.getEmailFields();
                this.emailService.getEmailsByEntity(this.entityNumber, this.entityType).subscribe(
                    (emails: Email[]) => {
                        this.filteredData = this.emails = emails;
                    }, error => {
                        let errors = error.json();
                        this.toastr.error(errors.ExceptionMessage || errors.Message, "Oops!");
                    })
            })
    }

    filterData(filterVal, column) {
        let filterString = filterVal ? filterVal.toLocaleLowerCase() : '';
        let filteredData: Array<Email> = this.emails.filter((item: any) =>
            item[column].toLocaleLowerCase().match(filterString));
        this.filteredData = filteredData;
    }

    toogleCollapse() {
        this.collapsedMail = "";
        this.collapsed = !this.collapsed;
    }

    setCollapsedMail(mailId) {
        this.collapsedMail = mailId;
    }

}
