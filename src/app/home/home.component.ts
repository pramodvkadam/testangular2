import {Component, OnInit} from "@angular/core";
import {RecentFavoriteService} from "./recent-favorite.service";
import {ToastsManager} from "ng2-toastr";


@Component({
    selector: 'acsi-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [RecentFavoriteService]
})
export class HomeComponent implements OnInit {
    private favSubscriber: any;
    private recentSubscriber: any;
    favouriteList: any[] = [];
    recentList: any[] = [];
    selectedTab: string;
    tabs: string[];
    private listCount = 25;
    private favloading: boolean = false;
    private recentloading: boolean = false;

    constructor(private recentFavService: RecentFavoriteService, public toastr: ToastsManager) {
        this.tabs = ["Account", "Contact"/*, "Document", "Email"*/]
    }

    ngOnInit() {
        this.selectedTab = this.tabs[0];
        this.getFavoriteAndRecent(this.tabs[0]);
    }

    getFavoriteAndRecent(entity: string) {
        this.selectedTab = entity;
        if (this.favSubscriber) {

            this.favloading = true;
            this.favouriteList = [];
            this.favSubscriber.unsubscribe();
        }
        this.favSubscriber = this.recentFavService.getFavoriteEntities(entity, this.listCount)
            .subscribe((data: any) => {
                this.favouriteList = data;
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage || errors.Message, "Oops!");
            });

        if (this.recentSubscriber) {

            this.recentloading = true;
            this.recentList = [];
            this.recentSubscriber.unsubscribe();
        }
        this.recentSubscriber = this.recentFavService.getRecentEntities(entity, this.listCount)
            .subscribe((data: any) => {
                this.recentList = data;
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage || errors.Message, "Oops!");
            })
    }

    ngOnDestroy() {
        this.recentSubscriber.unsubscribe();
        this.favSubscriber.unsubscribe();
    }
}
