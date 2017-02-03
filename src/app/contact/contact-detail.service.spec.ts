/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {ContactDetailService} from './contact-detail.service';

describe('ContactDetailService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ContactDetailService]
        });
    });

    it('should ...', inject([ContactDetailService], (service: ContactDetailService) => {
        expect(service).toBeTruthy();
    }));
});
