import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardpageComponent} from "./components/dashboardpage/dashboardpage.component";
import {TimelinepageComponent} from "./components/timelinepage/timelinepage.component";
const routes: Routes = [

  { path: '', component: DashboardpageComponent},
  { path: 'timeline', component: TimelinepageComponent},
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
