import { Injectable } from '@nestjs/common';
import {Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {CAPI_url} from "../smcomconfig";
import {CNC} from "../station/station.service";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class TopsService {
    constructor(private httpService: HttpService) {}

    findByCNCHandle(API_key: string, CNCHandle: string): Observable<AxiosResponse<CNC[]>> {
        return this.httpService.get(CAPI_url + 'tops?topcnchandlefield=' + CNCHandle, {
            headers: { Accept: 'application/json+v1' },
            auth: { username: API_key, password: null },
        });
    }
}
