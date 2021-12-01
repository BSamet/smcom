import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient, private storage: TokenStorageService) { }

  public timelineData(state : number, cnc : string | null){
    return this.http.get("http://localhost:3000/timeline_data?topstatehandlefield="+ state +"&topcnchandlefield="+ cnc);
  }

  intervalDate(start: Date, end: Date) {
    let arr=[]
    let dt
    for(dt=start; dt <= end; dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt));
    }
    return arr;
  };
}
