import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth.service";

@Component({
    selector: 'acsiinsp-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    user: string;
    private loggedIn;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.loggedInUser.subscribe(
            user => {
                this.user = user;
            });
        this.user = this.authService.getLoggedInUser();
        // this.authService.loggedIn.subscribe(loggedIn=>this.loggedIn = loggedIn)
        this.loggedIn = this.authService.isLoggedIn();
    }

    logOut() {
        this.authService.logOut();
    }
}
