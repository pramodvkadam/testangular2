/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {AccountDetailResolveService} from "./account-detail-resolve.service";

describe('AccountDetailResolveService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AccountDetailResolveService]
        });
    });

    it('should ...', inject([AccountDetailResolveService], (service: AccountDetailResolveService) => {
        expect(service).toBeTruthy();
    }));
});
