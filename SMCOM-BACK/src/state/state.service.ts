import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CAPI_url } from '../smcomconfig';
import { CNC } from '../station/station.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StateService {
  constructor(private httpService: HttpService) {}
  findAll(API_key: string): Observable<AxiosResponse<CNC[]>> {
    return this.httpService.get(CAPI_url + 'states', {
      headers: { Accept: 'application/json+v1' },
      auth: { username: API_key, password: null },
    });
  }

  findOne(API_key: string, id: string): Observable<AxiosResponse<CNC[]>> {
    return this.httpService.get(CAPI_url + 'states/' + id, {
      headers: { Accept: 'application/json+v1' },
      auth: { username: API_key, password: null },
    });
  }
}
