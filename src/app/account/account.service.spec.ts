/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {AccountServiceService} from "./account.service";

describe('AccountServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AccountServiceService]
        });
    });

    it('should ...', inject([AccountServiceService], (service: AccountServiceService) => {
        expect(service).toBeTruthy();
    }));
});
