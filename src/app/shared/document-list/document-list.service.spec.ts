/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {DocumentListService} from "./document-list.service";

describe('DocumentListService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DocumentListService]
        });
    });

    it('should ...', inject([DocumentListService], (service: DocumentListService) => {
        expect(service).toBeTruthy();
    }));
});
