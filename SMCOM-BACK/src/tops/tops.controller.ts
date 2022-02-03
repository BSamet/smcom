import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers, Query,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { catchError, map } from 'rxjs';
import { TopsService } from './tops.service';

@Controller('tops')
export class TopsController {
  constructor(private readonly topsService: TopsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id/status')
  getStatus(@Query() query, @Headers('API_key') API_key) {
    return this.topsService.findByCNCHandle(API_key, query.topcnchandlefield).pipe(
        map((response) => response.data),
        catchError((error) => {
          return [error];
        }),
    );
  }
}
