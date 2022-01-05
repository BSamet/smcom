import { Component, OnInit } from '@angular/core';
import {animCloseOpen, flyInOut} from "../../animations/animations";
import { LanguageService } from 'src/app/services/language.service';
import {TimelineService} from "../../services/timeline.service";
import {FormControl, FormGroup} from "@angular/forms";

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
    start: new FormControl(
      new Date(getDateStartingFromMidnight(new Date()).getTime() - 6*86400000)
    ),
    // par défaut récupère les données d'une semaine avant
    end: new FormControl(
      new Date(new Date(getDateStartingFromMidnight(new Date()).getTime() + 86399000))
    )
  });
  daysList: Date[] | undefined;
  isSideNavPin!: boolean;
  isShowKpi!: boolean;
  isShowTimeline!: boolean;

  constructor(private language:LanguageService, private timelineService: TimelineService) { }

  ngOnInit(): void {
    this.updateTimelines();
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
