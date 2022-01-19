import { Component, OnInit } from '@angular/core';
import {animCloseOpen, flyInOut} from "../../animations/animations";
import { LanguageService } from 'src/app/services/language.service';
import {TimelineService} from "../../services/timeline.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import moment from 'moment';

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
  selected: any;
  range = new FormGroup({
    start: new FormControl(
      new Date(this.timelineService.getDateStartingFromMidnight(new Date()).getTime() - 6*86400000)
    ),
    // par défaut récupère les données d'une semaine avant
    end: new FormControl(
      new Date(new Date(this.timelineService.getDateStartingFromMidnight(new Date()).getTime() + 86399000))
    )
  });
  ranges: any = {
    'Jour': [moment().startOf('day'), moment().endOf('day')],
    'Semaine': [moment().startOf('week'), moment().endOf('week')],
    'Mois': [moment().startOf('month'), moment().endOf('month')],
    'Année': [moment().startOf('year'), moment().endOf('year')]
  }
  daysList: Date[] | undefined;
  isSideNavPin!: boolean;
  isShowKpi!: boolean;
  isShowTimeline!: boolean;

  constructor(private language:LanguageService, private timelineService: TimelineService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateTimelines();
    this.isShowKpi = false;
    this.isShowTimeline = true;
    this.isSideNavPin = false;

  }

  toggleSideNavPin() {
    this.isSideNavPin = ! this.isSideNavPin;
  }

  updateTimelines() {
    this.daysList = this.timelineService.getDaysArray(new Date(this.range.value.start), new Date(this.range.value.end));
  }

  onUpdateDateRangePicker(){
    this.daysList = this.timelineService.getDaysArray(this.selected.startDate.toDate(), this.selected.endDate.toDate());
  }
}
