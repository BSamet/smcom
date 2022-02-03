import { HttpClient } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {Router, Routes} from "@angular/router";
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Status } from "../../../interfaces/status"
import {MOCKAPI_URL, NestAPI_URL} from "../../../smcomconfig";
import {flyInOut} from "../../../animations/animations";
@Component({
  selector: 'app-cnc-dashboard',
  templateUrl: './cnc-dashboard.component.html',
  styleUrls: ['./cnc-dashboard.component.css'],
  animations: [
    flyInOut
  ]
})
export class CncDashboardComponent implements OnInit {

  @Input() handle!: string;
  @Input() name!: string;
  status!:Status;
  constructor(private router: Router, private storage:TokenStorageService,
  private http: HttpClient) { }

  ngOnInit(): void {
    const API_key = this.storage.getUser().API_key;
    let URL = NestAPI_URL;
    if (this.storage.getDataMode() === "MOCK")
      URL = MOCKAPI_URL
    this.http.get(URL + 'station/' +this.handle+"/status", {headers: {
        API_key: API_key
      }}).subscribe(data=>{
        const statusData = data as Status;
        if( statusData !== this.status)
          this.status=statusData;
    })
  }
}
