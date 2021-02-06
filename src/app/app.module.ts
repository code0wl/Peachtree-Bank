import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BbUIModule} from './shared/bb-ui.module';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {HeaderComponent} from "./shared/components/header/header.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DashboardModule} from "./dashboard/dashboard.module";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BbUIModule,
    DashboardModule,
    CoreModule,
    NoopAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

