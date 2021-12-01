import { Component, OnInit } from '@angular/core';
import {animCloseOpen, flyInOut} from "../../animations/animations";

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

  isSideNavPin!: boolean;
  isShowKpi!: boolean;
  isShowTimeline!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isShowKpi = false;
    this.isShowTimeline = true;
    this.isSideNavPin = false;
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
