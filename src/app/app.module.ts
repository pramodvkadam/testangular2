import "./rxjs-extensions";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule, XHRBackend, RequestOptions} from "@angular/http";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {AppComponent} from "./app.component";
import {routing} from "./app.routing";
import {AuthService} from "./shared/auth.service";
import {HeaderComponent} from "./shared/header.component";
import {FooterComponent} from "./shared/footer.component";
import {AuthGuard} from "./shared/auth.guard";
import {HomeComponent} from "./home/home.component";
import {ToastModule} from "ng2-toastr/ng2-toastr";
import {HttpService} from "./shared/http.service";
import {AccountComponent} from "./home/favorite-recent-list/account.component";
import {ContactComponent} from "./home/favorite-recent-list/contact.component";
import {DocumentComponent} from "./home/favorite-recent-list/document.component";
import {EmailComponent} from "./home/favorite-recent-list/email.component";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {CampsiteService} from "./shared/campsite.service";
import {EmitterService} from "./shared/emitter.service";
import {AcsiService} from "./shared/acsi.service";
import {DocumentServiceService} from "./sub-modules/documents/document-service.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
      HomeComponent,
      AccountComponent, ContactComponent, DocumentComponent, EmailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
      Ng2BootstrapModule,
      ToastModule,
      InfiniteScrollModule
  ],
    providers: [AuthService, AuthGuard, EmitterService, {
        provide: HttpService,
        useFactory: (backend: XHRBackend, options: RequestOptions) => {
            return new HttpService(backend, options);
        },
        deps: [XHRBackend, RequestOptions]
    }, CampsiteService, AcsiService, DocumentServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
