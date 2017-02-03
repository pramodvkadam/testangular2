import {Injectable} from "@angular/core";
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";


@Injectable()
export class HttpService extends Http {
    private router: Router;
    private authService: AuthService;
    constructor(backend: XHRBackend, options: RequestOptions) {
        let token = localStorage.getItem('insp_token'); // your custom token getter function here
        options.headers.set('Authorization', `Bearer ${token}`);
        super(backend, options);
    }

    request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        let token = localStorage.getItem('insp_token');
        if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
            if (!options) {
                // let's make option object
                options = {headers: new Headers()};
            }
            options.headers.set('Authorization', `Bearer ${token}`);
        } else {
            // we have to add the token to the url object
            url.headers.set('Authorization', `Bearer ${token}`);
        }
        return super.request(url, options).catch(this.catchAuthError(this));
    }

    private catchAuthError(self: HttpService) {
        // we have to pass HttpService's own instance here as `self`
        return (res: Response) => {
            if (res.status === 401 || res.status === 403) {
                // if not authenticated this.router.navigate(['']);
                this.authService.logOut();
            }
            return Observable.throw(res);

        };
    }
}