import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { CAPI_url } from '../smcomconfig';

export interface CNC {
  Handle: number;
  Name: string;
  Description: string;
  Disabled: boolean;
  DNCMode: boolean;
  MDCMode: boolean;
  Workshop: string;
  DNCgroup: string;
  MDCGroups: [];
  DisableParentState: boolean;
}

@Injectable()
export class StationService {
  constructor(private httpService: HttpService) {}

  findAll(API_key: string): Observable<AxiosResponse<CNC[]>> {
    return this.httpService.get(CAPI_url + 'stations', {
      headers: { Accept: 'application/json+v1' },
      auth: { username: API_key, password: null },
    });
  }

  getStatus(API_key: string, id): Observable<AxiosResponse<CNC[]>> {
    return this.httpService.get(`${CAPI_url}station_statuses/${id}`, {
      headers: { Accept: 'application/json+v1' },
      auth: { username: API_key, password: null },
    });
  }

  findOne(API_key: string, id: string): Observable<AxiosResponse<CNC[]>> {
    return this.httpService.get(CAPI_url + 'stations/' + id, {
      headers: { Accept: 'application/json+v1' },
      auth: { username: API_key, password: null },
    });
  }
  getKPIData(
    API_key: string,
    Handle: string,
    startDay: string,
    endDay: string,
  ): Observable<AxiosResponse<CNC[]>> {
    return this.httpService.get(
      CAPI_url +
        'stations/' +
        Handle +
        '/kpi?dstart=' +
        startDay +
        'T00:00:00.000+02:00&dend=' +
        endDay +
        'T23:59:59.000+02:00',
      {
        headers: { Accept: 'application/json+v1' },
        auth: { username: API_key, password: null },
      },
    );
  }
}
