import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Cnc} from "../../interfaces/cnc"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NestAPI_URL} from "../../smcomconfig";
import {animate, state, style, transition, trigger} from "@angular/animations";
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
    private router: Router
  ) { }

  adminView = false;

  async update(){

    const API_key = this.storage.getUser().API_key;
    let URL = NestAPI_URL;
    if (this.storage.getDataMode() === "MOCK")
      URL = "http://localhost:3000/"
    this.http.get(URL + 'station', {headers: {
        API_key: API_key
      }}).subscribe(data=>{
      this.listCNC=data as Cnc[];
      console.log(this.listCNC)
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
    this.setAdminView();
    const self = this;
    this.update();

    setTimeout(function(){
      self.ngOnInit();
    }, 60000);

    this.isSideNavPin = false;
  }

  setAdminView(){
    const currentUser = this.storage.getUser();
    if(currentUser.roles.includes("admin")){
      this.adminView = true;
    } else { this.adminView = false}
  }

  toggleSideNavPin() {
    this.isSideNavPin = ! this.isSideNavPin;
  }
}
