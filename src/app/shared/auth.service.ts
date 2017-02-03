import {Injectable, EventEmitter} from "@angular/core";
import {Headers, Http, URLSearchParams, Response} from "@angular/http";
import {Router} from "@angular/router";
import {APP_CONFIG} from "./app.config";
import {User} from "./user.interface";
import {ForgetUser} from "./forget-user.interface";


@Injectable()
export class AuthService {


    private authUrl: string = "/login";
    private apiUrl = "";
    public loggedInUser = new EventEmitter<string>();
    private isLoggedInUser: boolean;
    public loggedIn = new EventEmitter<boolean>();
    private user;

    constructor(private http: Http, private router: Router) {
        this.setLoggedIn(!!localStorage.getItem('insp_token'));
        let user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user) {
            this.setLoggedInUser(user);
        }
        this.authUrl = APP_CONFIG.authorizationUrl;
        this.apiUrl = APP_CONFIG.apiUrl + "inspector/";
    }

    login(user: User) {
        const body = new URLSearchParams();
        body.append("grant_type", "password");
        body.append("password", user.password);
        body.append("username", user.username);

        return this.http
            .post(this.authUrl, body.toString())
            .map((response: Response) => {
                let res = response.json();
                if (res) {
                    localStorage.setItem('insp_token', res.access_token);
                    localStorage.setItem('loggedInUser', JSON.stringify(user.username));
                    this.setLoggedInUser(user.username);
                    this.setLoggedIn(!!localStorage.getItem('insp_token'));
                }
                return res;
            });
    }

    setLoggedIn(loggedIn: boolean) {
        this.isLoggedInUser = loggedIn;
        this.loggedIn.emit(loggedIn);
    }

    isLoggedIn() {
        return this.isLoggedInUser;
    }

    setLoggedInUser(user: string) {
        this.user = user;
        this.loggedInUser.emit(user);
    }

    getLoggedInUser() {
        return this.user;
    }

    logOut() {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('insp_token');
        this.setLoggedIn(false);
        this.setLoggedInUser("");
        // Send the user back to the login after logout
        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 100)
    }

    setRememberUsername(username: string, rememberMe: boolean) {
        return (rememberMe) ? localStorage.setItem('rememberMe', JSON.stringify(username)) : localStorage.removeItem('rememberMe');
    }

    getRememberedUser() {
        let rememberedUsername = JSON.parse(localStorage.getItem("rememberMe"));
        if (rememberedUsername) {
            return rememberedUsername;
        }
    }

    sendUsernameRequest(user: ForgetUser) {
        let headers = new Headers({
            'Content-Type': "application/json",
            'Accept': 'application/json'
        });

        return this.http
            .post(`${this.apiUrl}forgotusername`, user, {headers: headers})
            .map((response: Response) => response.json());
    }

    sendPasswordRequest(user: ForgetUser) {

        let headers = new Headers({
            'Content-Type': "application/json",
            'Accept': 'application/json'
        });

        return this.http
            .post(`${this.apiUrl}forgotpassword`, user, {headers: headers})
            .map((response: Response) => response.json());
    }
}
