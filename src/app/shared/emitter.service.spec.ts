/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {EmmiterService} from "./emitter.service";

describe('EmmiterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EmmiterService]
        });
    });

    it('should ...', inject([EmmiterService], (service: EmmiterService) => {
        expect(service).toBeTruthy();
    }));
});
