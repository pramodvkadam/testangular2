/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {AcsiService} from "./acsi.service";

describe('AcsiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AcsiService]
        });
    });

    it('should ...', inject([AcsiService], (service: AcsiService) => {
        expect(service).toBeTruthy();
    }));
});
