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
import { StateService } from './state.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { catchError, map } from 'rxjs';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Headers('API_key') API_key) {
    return this.stateService.findOne(API_key, id).pipe(
      map((response) => response.data),
      catchError((error) => {
        return [error];
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  findAll(@Headers('API_key') API_key) {
    return this.stateService.findAll(API_key).pipe(
      map((response) => response.data),
      catchError((error) => {
        return [error];
      }),
    );
  }
}
