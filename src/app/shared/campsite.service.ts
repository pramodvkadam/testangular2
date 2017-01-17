import {Injectable} from "@angular/core";
import {APP_CONFIG} from "./app.config";
import {HttpService} from "./http.service";
import {Response} from "@angular/http";

@Injectable()
export class CampsiteService {

    private apiUrl = "";


    constructor(private http: HttpService) {
        this.apiUrl = APP_CONFIG.apiUrl + "campsite/";
    }


    removeFavoriteEntity(favoriteEntity: string) {
        return this.http.put(`${this.apiUrl}unsetfavourite/${favoriteEntity}`, {})
            .map((res: Response) => {
                return res.json()
            })
    }

    addFavoriteEntity(favoriteEntity: string, entityType: number) {
        return this.http.put(`${this.apiUrl}setfavourite/${favoriteEntity}/${entityType}`, {})
            .map((res: Response) => {
                return res.json()
            })
    }

}
