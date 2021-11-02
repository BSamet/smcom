import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router";
import { DashboardpageComponent } from './components/dashboard/dashboardpage/dashboardpage.component';
import { KpistandardComponent } from './components/timeline/KPI/kpistandard/kpistandard.component';
import { TimelinepageComponent } from './components/timeline/timelinepage/timelinepage.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardpageComponent,
    KpistandardComponent,
    TimelinepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
