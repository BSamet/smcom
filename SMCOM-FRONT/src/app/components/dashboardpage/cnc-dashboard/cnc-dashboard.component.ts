import { HttpClient } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {Router, Routes} from "@angular/router";
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Status } from "../../../interfaces/status"
import {NestAPI_URL} from "../../../smcomconfig";
import {flyInOut} from "../../../animations/animations";
import { LanguageService } from 'src/app/services/language.service';
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
  constructor(private router: Router,
              private storage:TokenStorageService,
              private language:LanguageService,
  private http: HttpClient) { }

  ngOnInit(): void {
    const API_key = this.storage.getUser().API_key;
    let URL = NestAPI_URL;
    if (this.storage.getDataMode() === "MOCK")
      URL = "http://localhost:3000/"
    this.http.get(URL + 'station/' +this.handle+"/status", {headers: {
        API_key: API_key
      }}).subscribe(data=>{
        const statusData = data as Status;
        if( statusData !== this.status)
          this.status=statusData;
    })
  }
  getTextFromKey(key:string){
    return this.language.getTextFromKey(key)
  };
}
