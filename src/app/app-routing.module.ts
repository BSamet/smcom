import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginpageComponent} from "./components/loginpage/loginpage.component";
import {Error404pageComponent} from "./components/errorpages/error404page/error404page.component";

const routes: Routes = [
  { path: 'login', component: LoginpageComponent},

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
