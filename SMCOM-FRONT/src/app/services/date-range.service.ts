import { Injectable } from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {DateAdapter} from "@angular/material/core";
import {TimelineService} from "./timeline.service";

@Injectable({
  providedIn: 'root'
})
export class DateRangeService<D> {
  private range?: string;
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
      this.start = this.dateAdapter.addCalendarDays(date, 0);
      this.end = this.dateAdapter.addCalendarDays(date, 6);
      return new DateRange<Date>(this.start, this.end);
    }

    return new DateRange<Date>(null, null);
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

  changeRange(dateItem: string) {
    this.range = dateItem;
  }

  checkRange(date: Date){
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

  updateDayList(){
    return this.timelineService.getDaysArray(this.start, this.end);
  }
}
