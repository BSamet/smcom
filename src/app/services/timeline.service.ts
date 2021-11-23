import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private timelineApi = " http://localhost:3000/timeline_data?topstatehandlefield=0&topcnchandlefield=1";

  constructor(private http: HttpClient) { }

  public timelineData(){
    return this.http.get(this.timelineApi);
  }
}
