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

  isShowKpi!: boolean;
  isShowTimeline!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isShowKpi = false;
    this.isShowTimeline = true;
  }
  toggleShowKpi() {
    this.isShowKpi = ! this.isShowKpi;
  }
  toggleShowTimeline() {
    this.isShowTimeline = ! this.isShowTimeline;
  }
}
