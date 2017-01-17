import {Injectable} from "@angular/core";
import {APP_CONFIG} from "./app.config";
import {HttpService} from "./http.service";

@Injectable()
export class AcsiService {

    private apiUrl = "";

    constructor(private http: HttpService) {
        this.apiUrl = APP_CONFIG.apiUrl + "acsi/";
    }

    getParentOrganisations() {
        return this.http.get(`${this.apiUrl}parentorganization`)

            .map(response => response.json())
            .map(data => {
                data.unshift({Id: 0, Name: "Select Parent Organisation"});
                return data;
            });
    }

    getBranches(searchString: string) {
        return this.http.get(`${this.apiUrl}branches?searchText=${searchString}`)

            .map(response => response.json())
            .map(data => {
                data.unshift({Id: 0, Name: "Select Branch"});
                return data;
            })
    }

    getCountries(all: boolean) {
        return this.http.get(`${this.apiUrl}countries/${all}`)
            .map(response => response.json())
            .map(data => {
                data.unshift({Id: "", Name: "Select Country"});
                return data;
            });
    }

    getAddressTypes(isForContactPerson: boolean) {
        return this.http.get(`${this.apiUrl}addresstype/${isForContactPerson}`)
            .map(response => response.json())
            .map(data => {
                data.unshift({Id: 0, Name: "Select Address Type"});
                return data;
            });
    }

    getLanguages() {
        return this.http.get(`${this.apiUrl}languages`)

            .map(response => response.json())
            .map(data => {
                data.unshift({Id: "", Name: "Select Language"});
                return data;
            });
    }

    getJobTitles() {
        return this.http.get(`${this.apiUrl}jobtitle`)

            .map(response => response.json())
            .map(data => {
                data.unshift({Id: "", Name: "Select Job Title"});
                return data;
            });
    }

    getCampingEquipments() {
        return this.http.get(`${this.apiUrl}campsitequipments/camping`)

            .map(response => response.json())
            .map(data => {

                data.unshift({Id: "", Name: "Select Campsite Equipment"});
                return data;
            });
    }

    getAttributeCodes() {
        return this.http.get(`${this.apiUrl}attributecodes`)

            .map(response => response.json())
            .map(data => {
                data.unshift({Id: "", Name: "Select Attribute Code"});
                return data;
            });
    }


    getActionCodes() {
        return this.http.get(`${this.apiUrl}actioncodes`)

            .map(response => response.json())
            .map(data => {
                data.unshift({Id: "", Name: "Select Action Code"});
                return data;
            });
    }

    getActionCrossCodes(actionId: string) {
        return this.http.get(`${this.apiUrl}actioncrosscodes/${actionId}`)

            .map(response => response.json())
            .map(data => {
                data.unshift({Id: "", Name: "Select Action Cross Code"});
                return data;
            });
    }

    getActionResponces(actionId: string) {
        return this.http.get(`${this.apiUrl}actionresponses/${actionId}`)

            .map(response => response.json())
            .map(data => {
                data.unshift({Id: "", Name: "Select Responce"});
                return data;
            });
    }

    getTaskPriorities() {
        return this.http.get(`${this.apiUrl}taskpriorities`)

            .map(response => response.json())
            .map(data => {
                return data;
            });
    }

    getTaskStatuses() {
        return this.http.get(`${this.apiUrl}taskstatuses`)

            .map(response => response.json())
            .map(data => {
                return data;
            });
    }

    getUsers() {
        return this.http.get(`${this.apiUrl}users`)

            .map(response => response.json())
            .map(data => {
                data.unshift({Id: "", Name: "Select User"});
                return data;
            });
    }

    getLabels() {
        return this.http.get(`${this.apiUrl}labels`)

            .map(response => response.json())
            .map(data => {
                data.unshift({Id: "", Name: "Select Label"});
                return data;
            });
    }

    getDocumentSecurityLevels() {
        return this.http.get(`${this.apiUrl}documentsecuritylevels`)

            .map(response => response.json())
            .map(data => {
                data.unshift({Id: "", Name: "Select Security Level"});
                return data;
            });
    }

}
