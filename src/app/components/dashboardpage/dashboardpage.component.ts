import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Cnc} from "../../interfaces/cnc"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NestAPI_URL} from "../../smcomconfig";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css'],
})
export class DashboardpageComponent implements OnInit {
  listCNC!:Cnc[];
  constructor(
    private http: HttpClient,
    private storage: TokenStorageService
  ) { }

  ngOnInit(): void {
    const API_key = this.storage.getUser().API_key;
    this.http.get(NestAPI_URL + 'station', {headers: {
        API_key: API_key
      }}).subscribe(data=>{
      this.listCNC=data as Cnc[];
      console.log(this.listCNC)

    })
  }

}
