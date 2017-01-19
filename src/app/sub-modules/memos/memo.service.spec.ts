/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {MemoService} from "./memo.service";

describe('MemoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MemoService]
        });
    });

    it('should ...', inject([MemoService], (service: MemoService) => {
        expect(service).toBeTruthy();
    }));
});
