import { TestBed } from '@angular/core/testing';

import { DaterangepickerService } from './daterangepicker.service';

describe('DaterangepickerService', () => {
  let service: DaterangepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaterangepickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
