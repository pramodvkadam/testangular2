import {Component, OnInit} from "@angular/core";
import {AccountService} from "./account.service";
import {Subscription} from "rxjs";
import {ToastsManager} from "ng2-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountInfo} from "./account-info";
import {CampsiteService} from "../shared/campsite.service";
import {EntityType} from "../shared/entity-type.enum";
import set = Reflect.set;

@Component({
    selector: 'acsi-account-details',
    templateUrl: './account-details.component.html',
    styles: []
})
export class AccountDetailsComponent implements OnInit {


    private subscription: Subscription;
    private accountNumber: number;
    private accountInfo: AccountInfo;
    selectedTab: string;
    active: boolean = false;
    entityType: number;

    constructor(private accountService: AccountService,
                private campsiteService: CampsiteService,
                private router: Router,
                private route: ActivatedRoute,
                public toastr: ToastsManager) {
        this.entityType = EntityType.Account;
    }

    ngOnInit() {
        this.subscription = this.route.data
            .subscribe((data: {accountInfo: AccountInfo}) => {
                this.accountInfo = data.accountInfo;
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage || "Server Error!");
            })
    }

    loadTabz(tabName: string) {
        this.selectedTab = tabName.toLowerCase();
        this.router.navigate([`${this.selectedTab}`], {
            relativeTo: this.route,
            queryParams: {accountId: this.accountInfo.Id}
        });
    }

    removeFavoriteEntity(favouriteId: string) {
        this.campsiteService.removeFavoriteEntity(favouriteId).subscribe(response => {
            this.accountInfo.FavouriteId = null;
            this.toastr.info("Successfully removed from Favorite List");
        }, error => {
            let errors = error.json();
            this.toastr.error(errors.ExceptionMessage || "Server Error!");
        });
    }

    addFavoriteEntity(accountId: string) {
        this.campsiteService.addFavoriteEntity(accountId, this.entityType)
            .subscribe(response => {
                this.accountInfo.FavouriteId = response;
                this.toastr.info("Successfully added to Favorite List");
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage || "Server Error!");
            })
    }
}
