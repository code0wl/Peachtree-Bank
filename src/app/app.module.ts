import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BbUIModule} from './shared/bb-ui.module';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {HeaderComponent} from "./shared/components/header/header.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BbUIModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
