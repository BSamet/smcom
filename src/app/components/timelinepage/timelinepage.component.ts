import { Component, OnInit } from '@angular/core';
import {animCloseOpen, flyInOut} from "../../animations/animations";
import { LanguageService } from 'src/app/services/language.service';
import {TimelineService} from "../../services/timeline.service";

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

  daysList: Date[] | undefined;
  isSideNavPin!: boolean;
  isShowKpi!: boolean;
  isShowTimeline!: boolean;

  constructor(private language:LanguageService, private timelineService: TimelineService) { }

  ngOnInit(): void {
    const maxDay = new Date(2021, 10, 14);
    const sixDaysPrior = maxDay.getTime() - 6*86400000;
    this.daysList = this.timelineService.getDaysArray(new Date(sixDaysPrior), maxDay);
    this.isShowKpi = false;
    this.isShowTimeline = true;
    this.isSideNavPin = false;
  }

  getTextFromKey(key:string){
    return this.language.getTextFromKey(key)
  }
  toggleShowKpi() {
    this.isShowKpi = ! this.isShowKpi;
  }
  toggleShowTimeline() {
    this.isShowTimeline = ! this.isShowTimeline;
  }

  toggleSideNavPin() {
    this.isSideNavPin = ! this.isSideNavPin;
  }
}
