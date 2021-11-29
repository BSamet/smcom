import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NestAPI_URL} from "../smcomconfig";
import {Status} from "../interfaces/status";
import {TokenStorageService} from "./token-storage.service";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient, private storage: TokenStorageService) { }

  public timelineData(state : number, cnc : string | null){
    return this.http.get("http://localhost:3000/timeline_data?topstatehandlefield="+ state +"&topcnchandlefield="+ cnc);
  }

  dayOfWeekAsString(dayIndex:number) {
    return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
  }
  getDaysArray(start:Date, end:Date) {
    let arr;
    let dt;
    for(arr=[],dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt));
    }
    return arr;
  };

}
