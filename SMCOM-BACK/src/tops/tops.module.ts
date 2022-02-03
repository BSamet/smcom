import { Module } from '@nestjs/common';
import { TopsService } from './tops.service';
import { TopsController } from './tops.controller';

@Module({
  controllers: [TopsController],
  providers: [TopsService]
})
export class TopsModule {}
