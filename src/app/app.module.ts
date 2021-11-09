import {Component, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from "@angular/router";
import { DashboardpageComponent } from './components/dashboardpage/dashboardpage.component';
import { TimelinepageComponent } from './components/timelinepage/timelinepage.component';
import { KPIBlocComponent } from './components/timelinepage/kpibloc/kpibloc.component';
import { NavbarComponent } from './components/dashboardpage/navbar/navbar.component';
import { SidenavbarComponent } from './components/dashboardpage/sidenavbar/sidenavbar.component';
import { FooterComponent } from './components/dashboardpage/footer/footer.component';
import { KpiCircularComponent } from './components/timelinepage/kpibloc/kpi-circular/kpi-circular.component';
import { KpiProgressbarComponent } from './components/timelinepage/kpibloc/kpi-progressbar/kpi-progressbar.component';
import { KpiIndicatorComponent } from './components/timelinepage/kpibloc/kpi-indicator/kpi-indicator.component';
import { CncDashboardComponent } from './components/dashboardpage/cnc-dashboard/cnc-dashboard.component';
import { TimelineLineComponent } from './components/timelinepage/timeline-line/timeline-line.component';
import { TimelinePeriodComponent } from './components/timelinepage/timeline-line/timeline-period/timeline-period.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardpageComponent,
    TimelinepageComponent,
    KPIBlocComponent,
    NavbarComponent,
    SidenavbarComponent,
    FooterComponent,
    KpiCircularComponent,
    KpiProgressbarComponent,
    KpiIndicatorComponent,
    CncDashboardComponent,
    TimelineLineComponent,
    TimelinePeriodComponent
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
