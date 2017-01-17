import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'acsi-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

    @Input()
    data;

    constructor() {
    }

    ngOnInit() {
    }

}
