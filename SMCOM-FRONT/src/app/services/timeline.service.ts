import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MOCKAPI_URL, NestAPI_URL} from "../smcomconfig";
import {Status} from "../interfaces/status";
import {TokenStorageService} from "./token-storage.service";
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient, private storage: TokenStorageService) { }

  public timelineDataV2(cnc : string | null){
    return this.http.get(MOCKAPI_URL + "tops?topcnchandlefield="+ cnc);
  }

  datesAreOnSameDay(first:Date, second:Date){
    return first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate();
  }

  dayOfWeekAsString(dayIndex:number) {
    return ["Dimanche", "Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"][dayIndex] || '';
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

  addDays(date:Date, days : number): Date{
    date.setDate(date.getDate() + days);
    return date;
  }

  getPreviousDayRangeList(dateList: Date[]): Date[]{
    const newStart = moment(dateList[0]).add(-dateList.length+1, 'days').toDate()
    const endDate = dateList[0]
    dateList = this.getDaysArray(newStart, endDate)
    return dateList;
  }

}
