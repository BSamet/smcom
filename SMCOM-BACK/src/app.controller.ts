import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {AppService} from "./app.service";
import {catchError, map} from "rxjs";

@Controller()
export class AppController {
  constructor(private authService: AuthService, private appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('ping')
  sendPong(){
    return this.appService.pong()
  }

  @Get('pingCAPI')
  sendPongFromCAPI(){
    return this.appService.pingCAPI().pipe(
        map((response) => response.data),
        catchError((error) => {
          if (error.response && error.response.status == 401) return ['pong'];
          else return [error];
        }),
    );
  }

}
