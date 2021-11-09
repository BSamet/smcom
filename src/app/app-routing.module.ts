import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginpageComponent} from "./components/loginpage/loginpage.component";
import {Error404pageComponent} from "./components/errorpages/error404page/error404page.component";
import {ProfilepageComponent} from "./components/profilepage/profilepage.component";
import {DashboardpageComponent} from "./components/dashboardpage/dashboardpage.component";
import {TimelinepageComponent} from "./components/timelinepage/timelinepage.component";
import { CncComponent } from './components/cnc/cnc.component';

const routes: Routes = [
  { path: '', component: DashboardpageComponent},
  { path: 'timeline', component: TimelinepageComponent},
  { path: 'cnc', component: CncComponent},
  { path: 'login', component: LoginpageComponent},
  { path: 'profile', component: ProfilepageComponent},
  { path: '**', pathMatch: 'full',
    component: Error404pageComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
