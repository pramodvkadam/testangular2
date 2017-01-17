/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {DocumentServiceService} from "./document-service.service";

describe('DocumentServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DocumentServiceService]
        });
    });

    it('should ...', inject([DocumentServiceService], (service: DocumentServiceService) => {
        expect(service).toBeTruthy();
    }));
});
