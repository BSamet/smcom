import { Injectable } from '@angular/core';
import {DateRange, MatDateRangeSelectionStrategy} from "@angular/material/datepicker";
import {DateAdapter} from "@angular/material/core";

@Injectable({
  providedIn: 'root'
})
export class DaterangepickerService<D> implements MatDateRangeSelectionStrategy<D> {
  private range?: string;
  constructor(private dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D): DateRange<D> {
    return this.checkRange(date);
  }

  createPreview(activeDate: D): DateRange<D> {
    return this.checkRange(activeDate);
  }

  private createDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this.dateAdapter.addCalendarDays(date, 0);
      const end = this.dateAdapter.addCalendarDays(date, 0);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }

  private createWeekRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this.dateAdapter.addCalendarDays(date, 0);
      const end = this.dateAdapter.addCalendarDays(date, 6);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }

  private createMonthRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this.dateAdapter.addCalendarDays(date, 0);
      const end = this.dateAdapter.addCalendarDays(date, 30);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }

  private createYearRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this.dateAdapter.addCalendarDays(date, 0);
      const end = this.dateAdapter.addCalendarDays(date, 365);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }

  changeRange(dateItem: string) {
    this.range = dateItem;
  }

  checkRange(date: D){
    switch (this.range) {
      case "Jour":
        return this.createDayRange(date);
      case "Semaine":
        return this.createWeekRange(date);
      case "Mois":
        return this.createMonthRange(date);
      case "Année":
        return this.createYearRange(date);
      default:
        return this.createDayRange(date);
    }
  }
}
