import { Component, OnInit } from '@angular/core';
import {KpiService} from "../../../services/kpi.service";
import {KPI} from "../../../interfaces/kpi";
import {NestAPI_URL} from "../../../smcomconfig";
import {TokenStorageService} from "../../../services/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-kpibloc',
  templateUrl: './kpibloc.component.html',
  styleUrls: ['./kpibloc.component.css']
})
export class KPIBlocComponent implements OnInit {

  kpiData!:KPI;
  id!: string | null;
  dateNow = new Date();
  myDate: string | null;

  constructor(private KpiService:KpiService, private storage: TokenStorageService, private http: HttpClient, private route: ActivatedRoute, private datePipe: DatePipe) {
    this.myDate = this.datePipe.transform(this.dateNow, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getKPIValue(this.id, this.myDate, this.myDate)
  }

  // Put KPI data in variable
  getKPIValue(Handle: string | null, startDay: string | null, endDay: string | null) {
    const API_key = this.storage.getUser().API_key;
    this.http.get(NestAPI_URL + 'station/'+Handle+'/kpi/selectByDate/'+startDay+'/'+endDay, {headers: {
        API_key: API_key
      }}).subscribe(data=>{
      this.kpiData=data as KPI;
    })
  }

  // Convert second to hours and minutes
  convertTime(secondsToConvert : number) {
    let day = 0
    let hours = 0
    let minutes = 0
    let seconds = 0
    day = Math.floor(secondsToConvert / (3600*24))
    hours = Math.floor(secondsToConvert % (3600*24) /3600)
    minutes = Math.floor(secondsToConvert % 3600 / 60)
    seconds = Math.floor(secondsToConvert % 60)
   return day +'d '+ hours +'h'+ minutes +'m'+ seconds +'s'
  }
}
