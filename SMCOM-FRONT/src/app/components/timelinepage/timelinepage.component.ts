import { Component, OnInit } from '@angular/core';
import {animCloseOpen, flyInOut} from "../../animations/animations";
import { LanguageService } from 'src/app/services/language.service';
import {TimelineService} from "../../services/timeline.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-timelinepage',
  templateUrl: './timelinepage.component.html',
  styleUrls: ['./timelinepage.component.css'],
  animations: [
    animCloseOpen,
    flyInOut
  ]
})
export class TimelinepageComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  daysList: Date[] | undefined;
  isSideNavPin!: boolean;
  isShowKpi!: boolean;
  isShowTimeline!: boolean;

  constructor(private language:LanguageService, private timelineService: TimelineService) { }

  ngOnInit(): void {
    // const maxDay = new Date(2021, 10, 30);
    // const sixDaysPrior = maxDay.getTime() - 6*86400000;
    // this.daysList = this.timelineService.getDaysArray(new Date(sixDaysPrior), maxDay);
    this.isShowKpi = false;
    this.isShowTimeline = true;
    this.isSideNavPin = false;
  }

  toggleSideNavPin() {
    this.isSideNavPin = ! this.isSideNavPin;
  }

  updateTimelines(change: string, $event: MatDatepickerInputEvent<Date>) {
    this.daysList = this.timelineService.getDaysArray(new Date(this.range.value.start), new Date(this.range.value.end));
  }
}
