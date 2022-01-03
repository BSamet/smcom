import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NestAPI_URL} from "../smcomconfig";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  constructor(private http:HttpClient, private storage: TokenStorageService) { }

}
