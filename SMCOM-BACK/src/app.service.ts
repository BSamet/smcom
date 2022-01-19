import { Injectable } from '@nestjs/common';
import {Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {CNC} from "./station/station.service";
import {CAPI_url} from "./smcomconfig";
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {
  }
  pong(): string {
    return 'pong';
  }

  pingCAPI(): Observable<AxiosResponse<null>> {
    return this.httpService.get(CAPI_url + 'stations', {headers: { Accept: 'application/json+v1' }});
  }

}
