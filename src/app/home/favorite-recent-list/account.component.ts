import {Component, OnInit, Input} from "@angular/core";
import {Account} from "./account";

@Component({
    selector: 'acsi-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    @Input()
    accounts: Account[];
    accountList: Account[];
    start: number = 0;
    next: number = 10;

    constructor() {
        this.accountList = [];
    }

    ngOnInit() {
        if (this.accounts.length) {
            this.onScrollDown();
        }
    }

    onScrollDown() {
        const start = this.start;
        this.start = this.next;
        this.next += 10;
        for (let i = start; i < this.next; ++i) {
            if (this.accounts[i]) {
                this.accountList.push(this.accounts[i]);
            }
        }
    }

}
