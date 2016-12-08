import "./rxjs-extensions";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {AppComponent} from "./app.component";
import {routing} from "./app.routing";
import {AuthService} from "./shared/auth.service";
import {HeaderComponent} from "./shared/header.component";
import {FooterComponent} from "./shared/footer.component";
import {AuthGuard} from "./shared/auth.guard";
import {HomeComponent} from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2BootstrapModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
