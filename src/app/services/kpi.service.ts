import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  constructor(private http:HttpClient) { }

  getKPIData(Handle: number, startDay: string, endDay: string) {
    return this.http.get<any>('http://10.3.0.140:4445/CAPI/REST/stations/'+ Handle +'/kpi?dstart='+ startDay +'T00:00:00.000+02:00&dend='+ endDay +'T23:59:59.000+02:00')
  }
}
