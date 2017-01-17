import {Component, OnInit, Input} from "@angular/core";
import {Contact} from "./contact";

@Component({
    selector: 'acsi-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    @Input()
    contacts: Contact[];
    contactList: Contact[];
    start: number = 0;
    next: number = 10;

    constructor() {
        this.contactList = [];
    }

    ngOnInit() {
        this.contactList = [];
        if (this.contacts.length) {
            this.onScrollDown();
        }
    }

    onScrollDown() {
        const start = this.start;
        this.start = this.next;
        this.next += 10;
        for (let i = start; i < this.next; ++i) {
            if (this.contacts[i]) {
                this.contactList.push(this.contacts[i]);
            }
        }
    }
}
