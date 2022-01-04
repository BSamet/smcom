import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StationModule } from './station/station.module';
import { StateModule } from './state/state.module';

@Module({
  imports: [AuthModule, UsersModule, StationModule, StateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
