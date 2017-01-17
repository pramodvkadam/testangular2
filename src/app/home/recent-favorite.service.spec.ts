/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {RecentFavoriteService} from "./recent-favorite.service";

describe('RecentFavoriteService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RecentFavoriteService]
        });
    });

    it('should ...', inject([RecentFavoriteService], (service: RecentFavoriteService) => {
        expect(service).toBeTruthy();
    }));
});
