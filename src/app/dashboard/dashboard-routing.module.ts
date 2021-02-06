import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

const routes: Route[] = [
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
