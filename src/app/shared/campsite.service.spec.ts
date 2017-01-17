/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {CampsiteService} from "./campsite.service";

describe('CampsiteService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CampsiteService]
        });
    });

    it('should ...', inject([CampsiteService], (service: CampsiteService) => {
        expect(service).toBeTruthy();
    }));
});
