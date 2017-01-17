import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'acsi-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
    @Input()
    data;

    constructor() {
    }

    ngOnInit() {
    }

}
