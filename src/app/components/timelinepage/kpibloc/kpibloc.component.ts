import { Component, OnInit } from '@angular/core';
import {KpiService} from "../../../services/kpi.service";
import {KPI} from "../../../interfaces/kpi";
import {NestAPI_URL} from "../../../smcomconfig";
import {Cnc} from "../../../interfaces/cnc";
@Component({
  selector: 'app-kpibloc',
  templateUrl: './kpibloc.component.html',
  styleUrls: ['./kpibloc.component.css']
})
export class KPIBlocComponent implements OnInit {

  kpiData!:KPI;

  constructor(private KpiService:KpiService) { }

  ngOnInit(): void {
    this.getKPIValue(1, "2021-11-17", "2021-11-17")
  }

  // Put KPI data in variable
  getKPIValue(Handle: number, startDay: string, endDay: string) {
    const API_key = this.storage.getUser().API_key;
    this.http.get(NestAPI_URL + 'station', {headers: {
        API_key: API_key
      }}).subscribe(data=>{
      this.listCNC=data as Cnc[];
      console.log(this.listCNC)

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
