import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router";
import { DashboardpageComponent } from './components/dashboardpage/dashboardpage.component';
import { TimelinepageComponent } from './components/timelinepage/timelinepage.component';
import { KPIBlocComponent } from './components/timelinepage/kpibloc/kpibloc.component';
import { KpiCircularComponent } from './components/timelinepage/kpibloc/kpi-circular/kpi-circular.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardpageComponent,
    TimelinepageComponent,
    KPIBlocComponent,
    KpiCircularComponent
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
