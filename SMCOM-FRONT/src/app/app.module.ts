import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from "@angular/router";
import { DashboardpageComponent } from './components/dashboardpage/dashboardpage.component';
import { TimelinepageComponent } from './components/timelinepage/timelinepage.component';
import { KPIBlocComponent } from './components/timelinepage/kpibloc/kpibloc.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { Error404pageComponent } from './components/errorpages/error404page/error404page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { ProfilepageComponent } from './components/profilepage/profilepage.component';
import { NavbarComponent } from './components/dashboardpage/navbar/navbar.component';
import { SidenavbarComponent } from './components/dashboardpage/sidenavbar/sidenavbar.component';
import { FooterComponent } from './components/dashboardpage/footer/footer.component';
import { KpiCircularComponent } from './components/timelinepage/kpibloc/kpi-circular/kpi-circular.component';
import { KpiProgressbarComponent } from './components/timelinepage/kpibloc/kpi-progressbar/kpi-progressbar.component';
import { KpiIndicatorComponent } from './components/timelinepage/kpibloc/kpi-indicator/kpi-indicator.component';
import { CncDashboardComponent } from './components/dashboardpage/cnc-dashboard/cnc-dashboard.component';
import { TimelineLineComponent } from './components/timelinepage/timeline-line/timeline-line.component';
import { TimelinePeriodComponent } from './components/timelinepage/timeline-line/timeline-period/timeline-period.component';
import {CommonModule, DatePipe} from '@angular/common'
import {NgApexchartsModule} from "ng-apexcharts";
import { TimelinenavigationComponent } from './components/timelinepage/timeline_navigation/timelinenavigation/timelinenavigation.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { ServicecheckerComponent } from './components/servicechecker/servicechecker.component';
import { AbilityModule } from '@casl/angular';
import { Ability, PureAbility } from '@casl/ability';
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import { PermissionsComponent } from './components/permissions/permissions.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardpageComponent,
    TimelinepageComponent,
    KPIBlocComponent,
    LoginpageComponent,
    Error404pageComponent,
    ProfilepageComponent,
    NavbarComponent,
    SidenavbarComponent,
    FooterComponent,
    KpiCircularComponent,
    KpiProgressbarComponent,
    KpiIndicatorComponent,
    CncDashboardComponent,
    TimelineLineComponent,
    TimelinePeriodComponent,
    TimelinenavigationComponent,
    ServicecheckerComponent,
    PermissionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    AbilityModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [
    { provide: Ability, useValue: new Ability() },
    { provide: PureAbility, useExisting: Ability },
    authInterceptorProviders, DatePipe, HttpClientModule],
  bootstrap: [AppComponent],
})

export class AppModule { }
