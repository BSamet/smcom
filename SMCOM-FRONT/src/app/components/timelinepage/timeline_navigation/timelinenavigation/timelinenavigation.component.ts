import {Component, Input, OnInit} from '@angular/core';
import {flyInOut} from "../../../../animations/animations";
import {TimelineData, TimelineDataEpoch} from "../../../../interfaces/timeline";
import {State} from "../../../../interfaces/status";
import moment from "moment";

@Component({
  selector: 'app-timelinenavigation',
  templateUrl: './timelinenavigation.component.html',
  styleUrls: ['./timelinenavigation.component.css'],
  animations: [
    flyInOut
  ]
})
export class TimelinenavigationComponent implements OnInit {

  @Input() timelineData: TimelineData[] = []
  @Input() stateData: State[] = []
  private statsList: State[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  update(): void {
    this.statsList = this.stateData;
    const topsData = this.timelineData;
    let orderedTopsData: TimelineDataEpoch[] = [];
    for (let top of topsData) {
      let start =
        moment(top.topstartdatefield, 'MM-DD-YYYY HH-mm-ss').unix() *
        1000;
      let end =
        moment(top.topenddatefield, 'MM-DD-YYYY HH-mm-ss').unix() * 1000;
      if (top.topdurationfield == 0){
        end = Date.now()
      }

      let epochTop = {
        toppkfield: top.toppkfield,
        topcnchandlefield: top.topcnchandlefield,
        topstatehandlefield: top.topstatehandlefield,
        topstartdatefield: start,
        topenddatefield: end,
        topdurationfield: top.topdurationfield
      } as TimelineDataEpoch;

      
    }
  }
}
