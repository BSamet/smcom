import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Cnc} from "../../interfaces/cnc"
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardpageComponent implements OnInit {
  listCNC!:Cnc[];
  constructor(
    private http: HttpClient
    
  ) { }

  ngOnInit(): void {
    const header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Basic ${btoa("vayv33mljnV9F5OkdFajxhRdp")}`)
      .set("Accept",'application/json+v1')
  }
    console.log(header)
    this.http.get("http://10.3.0.140:3000/station",header).subscribe(data=>{
      this.listCNC=data as Cnc[];
      console.log(this.listCNC)

    })
  }

}
