import { HttpClient } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Status } from "../../../interfaces/status"
import {NestAPI_URL} from "../../../smcomconfig";
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
    this.http.get(NestAPI_URL + 'station/' +this.handle+"/status", {headers: {
        API_key: API_key
      }}).subscribe(data=>{
      this.status=data as Status;
      console.log(this.status)

    })
  }
}
