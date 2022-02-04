import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import {MOCKAPI_URL} from "../../../SMCOM-FRONT/src/app/smcomconfig";

// This should be a real class/interface representing a user entity
// TODO : Store users in a database with a user entity!!!
// TODO : This is only temporary and should not be pushed to production
export type User = any;

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {
    this.users = this.httpService.get(MOCKAPI_URL + "users").subscribe(data => this.users = data.data);
  }
  users;

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
