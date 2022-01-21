import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangePickerSelectionStrategyComponent } from './date-range-picker-selection-strategy.component';

describe('DateRangePickerSelectionStrategyComponent', () => {
  let component: DateRangePickerSelectionStrategyComponent;
  let fixture: ComponentFixture<DateRangePickerSelectionStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateRangePickerSelectionStrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerSelectionStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
