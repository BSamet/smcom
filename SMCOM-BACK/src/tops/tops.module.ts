import { Module } from '@nestjs/common';
import { TopsService } from './tops.service';
import { TopsController } from './tops.controller';
import {AuthModule} from "../auth/auth.module";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [AuthModule, HttpModule],
  controllers: [TopsController],
  providers: [TopsService]
})
export class TopsModule {}
