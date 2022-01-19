import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../../services/token-storage.service";
import { Cnc } from "../../interfaces/cnc"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NestAPI_URL} from "../../smcomconfig";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css'],
})
export class DashboardpageComponent implements OnInit {
  isSideNavPin!: boolean;
  listCNC!:Cnc[];
  constructor(
    private http: HttpClient,
    private storage: TokenStorageService,
    private router: Router,
  ) { }

  async update(){

    const self = this;
    setTimeout(function(){
      self.update();
    }, 10000);

    const API_key = this.storage.getUser().API_key;
    let URL = NestAPI_URL;
    if (this.storage.getDataMode() === "MOCK")
      URL = "http://localhost:3000/"
    this.http.get(URL + 'station', {headers: {
        API_key: API_key
      }}).subscribe(data=>{
        const cncData = data as Cnc[];
        if (this.listCNC == undefined || JSON.stringify(cncData) !== JSON.stringify(this.listCNC))
          this.listCNC=cncData;

    }, error => {
      if (error.error) {
        if (error.error.statusCode == 401){
          this.storage.signOut();
          this.router.navigate(['login/expired']).then();
        }
      }
    })

  }
  ngOnInit(): void {
    this.update();

    this.isSideNavPin = false;
  }

  toggleSideNavPin() {
    this.isSideNavPin = ! this.isSideNavPin;
  }
}
