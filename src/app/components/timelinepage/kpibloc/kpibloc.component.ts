import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import {KpiService} from "../../../services/kpi.service";

@Component({
  selector: 'app-kpibloc',
  templateUrl: './kpibloc.component.html',
  styleUrls: ['./kpibloc.component.css']
})
export class KPIBlocComponent implements OnInit {

  // KPI rates variable
  kpiTRE !: number;
  kpiTRG !: number;
  kpiTRS !: number;
  kpiAvailability !: number;
  kpiPerformance !: number;
  kpiQuality !: number;
  kpiInvolvement !: number;
  kpiLoad !: number;
  kpiRequisition !: number;
  kpiHardwareAvailability !: number;

  // KPI times variable
  timeAT !: string;
  timeOT !: string;
  timePPT !: string;
  timeRT !: string;
  timeNRT !: string;
  timeFPT !: string;
  timeFT !: string;
  timeMTBF !: string;
  timeMTTR !: string;

  // Get Current Date
  currentDate !: string;


  constructor(private KpiService:KpiService) { }

  ngOnInit(): void {
    this.getKPIValue(1, "2021-11-17", "2021-11-17")
    console.log(this.currentDate)
  }

  // Put KPI data in variable
  getKPIValue(Handle: number, startDay: string, endDay: string) {
    this.KpiService.getKPIData(Handle, startDay, endDay).subscribe(data => {
      this.kpiTRE = data.Rates.TEEP *100
      this.kpiTRG = data.Rates.GEE *100
      this.kpiTRS = data.Rates.OEE *100
      this.kpiAvailability = data.Rates.Availability *100
      this.kpiPerformance = data.Rates.Performance *100
      this.kpiQuality = data.Rates.Quality *100
      this.kpiInvolvement = data.Rates.Involvement *100
      this.kpiLoad = data.Rates.Load *100
      this.kpiRequisition = data.Rates.Requisition *100
      this.kpiHardwareAvailability = data.Rates.HardwareAvailability *100
      this.timeAT = this.convertTime(data.Times.AT)
      this.timeOT = this.convertTime(data.Times.OT)
      this.timePPT = this.convertTime(data.Times.PPT)
      this.timeRT = this.convertTime(data.Times.RT)
      this.timeNRT = this.convertTime(data.Times.NRT)
      this.timeFPT = this.convertTime(data.Times.FPT)
      this.timeFT = this.convertTime(data.Times.FT)
      this.timeMTBF = this.convertTime(data.Times.MTBF)
      this.timeMTTR = this.convertTime(data.Times.MTTR)
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
