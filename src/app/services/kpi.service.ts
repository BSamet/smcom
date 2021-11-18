import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NestAPI_URL} from "../smcomconfig";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  constructor(private http:HttpClient, private storage: TokenStorageService) { }

  getKPIData(Handle: number, startDay: string, endDay: string) {
    const API_key = this.storage.getUser().API_key;
    return this.http.get<any>(NestAPI_URL + 'station/'+ Handle +'/kpi/selectByDate/'+ startDay +'/'+ endDay, {headers: {
    API_key: API_key
    }})
  }
}
