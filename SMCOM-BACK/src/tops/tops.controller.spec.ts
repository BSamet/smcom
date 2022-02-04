import { Test, TestingModule } from '@nestjs/testing';
import { TopsController } from './tops.controller';
import { TopsService } from './tops.service';

describe('TopsController', () => {
  let controller: TopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopsController],
      providers: [TopsService],
    }).compile();

    controller = module.get<TopsController>(TopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
