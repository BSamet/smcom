import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {CAPI_url} from "../smcomconfig";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
      API_key: user.API_key,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
