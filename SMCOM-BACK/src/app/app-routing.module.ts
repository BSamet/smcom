import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginpageComponent} from "./components/loginpage/loginpage.component";
import {Error404pageComponent} from "./components/errorpages/error404page/error404page.component";
import {ProfilepageComponent} from "./components/profilepage/profilepage.component";
import {DashboardpageComponent} from "./components/dashboardpage/dashboardpage.component";
import {TimelinepageComponent} from "./components/timelinepage/timelinepage.component";
import {NeedAdminRole, NeedNormalRole, Permissions} from "./helpers/hasRoleGuard";
const routes: Routes = [
  { path: '', component: DashboardpageComponent, canActivate:[NeedNormalRole]},
  { path: 'cnc/:id', component: TimelinepageComponent},
  { path: 'login', component: LoginpageComponent},
  { path: 'login/:err', component: LoginpageComponent},
  { path: 'profile', component: ProfilepageComponent, canActivate:[NeedNormalRole]},
  { path: '**', pathMatch: 'full',
    component: Error404pageComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers:[Permissions, NeedNormalRole, NeedAdminRole]
})
export class AppRoutingModule { }
