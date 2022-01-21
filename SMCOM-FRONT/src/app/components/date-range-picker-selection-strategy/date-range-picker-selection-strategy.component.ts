import {Component, Injectable, OnInit} from '@angular/core';
import {
  DateRange,
} from '@angular/material/datepicker';
import {DaterangepickerService} from "../../services/daterangepicker.service";

@Injectable()
export class DayRangeSelectionStrategy<D> {
  constructor(private daterangeService: DaterangepickerService<D>) {}

  selectionFinished(date: D): DateRange<D> {
    return this.daterangeService.selectionFinished(date);
  }

  createPreview(activeDate: D): DateRange<D> {
    return this.daterangeService.createPreview(activeDate);
  }
}
@Component({
  selector: 'app-date-range-picker-selection-strategy',
  templateUrl: './date-range-picker-selection-strategy.component.html',
  styleUrls: ['./date-range-picker-selection-strategy.component.css'],

})
export class DateRangePickerSelectionStrategyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
