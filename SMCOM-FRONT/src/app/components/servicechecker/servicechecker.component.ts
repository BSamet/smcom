import { Component, OnInit } from '@angular/core';
import {MOCKAPI_URL, NestAPI_URL} from "../../smcomconfig";
import {Ping} from "../../interfaces/ping";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-servicechecker',
  templateUrl: './servicechecker.component.html',
  styleUrls: ['./servicechecker.component.css']
})
export class ServicecheckerComponent implements OnInit {

  nestJSStatus: boolean = false;
  JSONServerStatus: boolean = false;
  CAPIStatus: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.checkNest();
    this.checkJSON();
    this.checkCAPI();
  }
  private checkNest(){
    this.http.get(NestAPI_URL + 'ping', {responseType: 'text'}).subscribe(data=>{
      this.nestJSStatus = data === 'pong';
    })
  }

  private checkCAPI(){
    this.http.get(NestAPI_URL + 'pingCAPI', {responseType: 'text'}).subscribe(data=>{
      this.CAPIStatus = data === 'pong';
    })
  }

  private checkJSON(){
    this.http.get(MOCKAPI_URL + 'ping?res=pong', {responseType: 'json'}).subscribe(data =>{

      const response = data as Ping[];
      for (let res of response) this.JSONServerStatus = res.res === 'pong';
    })
  }
}
