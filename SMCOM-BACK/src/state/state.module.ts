import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { AuthModule } from "../auth/auth.module";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [AuthModule, HttpModule],
  controllers: [StateController],
  providers: [StateService]
})
export class StateModule {}
