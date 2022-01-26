import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NestAPI_URL} from "../smcomconfig";
import {Status} from "../interfaces/status";
import {TokenStorageService} from "./token-storage.service";
import * as moment from "moment";
import { LanguageService } from 'src/app/services/language.service';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient,
              private storage: TokenStorageService,
              private language:LanguageService) { }

  public timelineData(state : number, cnc : string | null){
    return this.http.get("http://localhost:3000/timeline_data?topstatehandlefield="+ state +"&topcnchandlefield="+ cnc);
  }

  public timelineDataV2(cnc : string | null){
    return this.http.get("http://localhost:3000/timeline_data?topcnchandlefield="+ cnc);
  }

  datesAreOnSameDay(first:Date, second:Date){
    return first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate();
  }

  dayOfWeekAsString(dayIndex:number) {
    return [this.getTextFromKey("sunday"), this.getTextFromKey("monday"),this.getTextFromKey("tuesday"),this.getTextFromKey("wensday"),this.getTextFromKey("thursday"),this.getTextFromKey("friday"), this.getTextFromKey("saturday")][dayIndex] || '';
  }


  getDaysArray(start:Date, end:Date) {
    let arr;
    let dt;
    for(arr=[],dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt));
    }
    return arr;
  };

  getDateStartingFromMidnight(dateTime:Date) {
    let date = new Date(dateTime.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
  }
  getTextFromKey(key:string){
    return this.language.getTextFromKey(key)
  };
}
