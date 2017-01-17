/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {ContactPersonService} from "./contact-person.service";

describe('ContactPersonService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ContactPersonService]
        });
    });

    it('should ...', inject([ContactPersonService], (service: ContactPersonService) => {
        expect(service).toBeTruthy();
    }));
});
