import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StationModule } from './station/station.module';
import { StateModule } from './state/state.module';
import {HttpModule, HttpService} from "@nestjs/axios";
import { TopsModule } from './tops/tops.module';

@Module({
  imports: [HttpModule, AuthModule, UsersModule, StationModule, StateModule, TopsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
