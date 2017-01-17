import {Component} from "@angular/core";
import {APP_CONFIG} from "./app.config";
@Component({
    selector: 'acsiinsp-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    private version;

    constructor() {
        this.version = APP_CONFIG.version;
    }

}
