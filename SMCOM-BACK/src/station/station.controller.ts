import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { StationService } from './station.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { catchError, map } from 'rxjs';

@Controller('station')
export class StationController {
  constructor(
    private readonly stationService: StationService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Headers('API_key') API_key) {
    return this.stationService.findAll(API_key).pipe(
      map((response) => response.data),
      catchError((error) => {
        return [error];
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/status')
  getStatus(@Param('id') id: string, @Headers('API_key') API_key) {
    return this.stationService.getStatus(API_key, +id).pipe(
      map((response) => response.data),
      catchError((error) => {
        return [error];
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Headers('API_key') API_key) {
    return this.stationService.findOne(API_key, id).pipe(
      map((response) => response.data),
      catchError((error) => {
        return [error];
      }),
    )
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/kpi/selectByDate/:dStart/:dEnd')
  getKPIData(
    @Param('id') id: string,
    @Param('dStart') dStart: string,
    @Param('dEnd') dEnd: string,
    @Headers('API_key') API_key,
  ) {
    console.log(id, dStart, dEnd, API_key);
    return this.stationService.getKPIData(API_key, id, dStart, dEnd).pipe(
      map((response) => response.data),
      catchError((error) => {
        return [error];
      }),
    );
  }
}
