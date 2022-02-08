import { Injectable } from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {DateAdapter} from "@angular/material/core";
import {TimelineService} from "./timeline.service";
import {dateRangeEnum} from "../components/timelinepage/timelinepage.component";

@Injectable({
  providedIn: 'root'
})
export class DateRangeService<D> {
  private readonly NB_OF_DAYS_IN_WEEK = 6; // ]0,6[, 0 is included
  private range?: number;
  private start!: Date;
  private end!: Date;
  constructor(private dateAdapter: DateAdapter<Date>, private timelineService: TimelineService) {}

  selectionFinished(date: Date): DateRange<Date> {
    return this.checkRange(date);
  }

  createPreview(activeDate: Date): DateRange<Date> {
    return this.checkRange(activeDate);
  }

  private createDayRange(date: Date | null): DateRange<Date> {
    if (date) {
      this.start = this.dateAdapter.addCalendarDays(date, 0);
      this.end = this.dateAdapter.addCalendarDays(date, 0);
      return new DateRange<Date>(this.start, this.end);
    }

    return new DateRange<Date>(null, null);
  }

  private createWeekRange(date: Date | null): DateRange<Date> {
    if (date) {
      this.start = this.dateAdapter.addCalendarDays(date, -this.dateAdapter.getDayOfWeek(date));
      this.end = this.dateAdapter.addCalendarDays(date, this.defineNumberOfDaysInAWeek(date));
      return new DateRange<Date>(this.start, this.end);
    }

    return new DateRange<Date>(null, null);
  }

  private defineNumberOfDaysInAWeek(date: Date): number {
    return (this.NB_OF_DAYS_IN_WEEK-this.dateAdapter.getDayOfWeek(date));
  }

  private createMonthRange(date: Date | null): DateRange<Date> {
    if (date) {
      this.start = this.dateAdapter.addCalendarDays(date, 0);
      this.end = this.dateAdapter.addCalendarDays(date, this.dateAdapter.getNumDaysInMonth(date)-1);
      return new DateRange<Date>(this.start, this.end);
    }

    return new DateRange<Date>(null, null);
  }

  private createYearRange(date: Date | null): DateRange<Date> {
    if (date) {
      this.start = this.dateAdapter.addCalendarDays(date, 0);
      this.end = this.dateAdapter.addCalendarYears(date, 1);
      return new DateRange<Date>(this.start, this.end);
    }

    return new DateRange<Date>(null, null);
  }

  changeRange(dateItem: number) {
    this.range = dateItem;
  }

  checkRange(date: Date){
    switch (this.range) {
      case dateRangeEnum.Day:
        return this.createDayRange(date);
      case dateRangeEnum.Week:
        return this.createWeekRange(date);
      case dateRangeEnum.Month:
        return this.createMonthRange(date);
      case dateRangeEnum.Year:
        return this.createYearRange(date);
      default:
        return this.createDayRange(date);
    }
  }
}

