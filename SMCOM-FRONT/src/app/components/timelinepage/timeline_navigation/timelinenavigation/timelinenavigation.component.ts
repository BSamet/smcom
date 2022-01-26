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
  statsList: State[] = [];
  selectedTop!: TimelineDataEpoch;

  constructor() { }

  ngOnInit(): void {
    this.update();
  }

  getFormatDate(epoch: number): string {
    return moment(new Date(epoch * 1000)).format('DD/MM/YYYY')
  }
  getFormatTime(epoch: number): string {
    return moment(new Date(epoch * 1000)).format('HH:mm:ss')
  }
  getFormatDuration(seconds: number): string {
    let d = Math.floor(seconds / (3600*24));
    let h = Math.floor(seconds % (3600*24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);

    let dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }
  /** Loads timeline and state data from the parent component, orders it by date and stores it in orderedTopsData */
  update(): void {
    this.statsList = this.stateData;
    const topsData = this.timelineData;
    let orderedTopsData: TimelineDataEpoch[] = [];
    for (let top of topsData) {
      let start =
        moment(top.topstartdatefield, 'MM-DD-YYYY HH-mm-ss').unix();
      let end =
        moment(top.topenddatefield, 'MM-DD-YYYY HH-mm-ss').unix();
      if (top.topdurationfield == 0){
        end = new Date().getTime() / 1000 // Divide by 1000 to get seconds instead of milliseconds
      }
      const duration = moment(moment(new Date(end * 1000)).diff(moment(new Date(start * 1000)))).unix()
      let epochTop = {
        toppkfield: top.toppkfield,
        topcnchandlefield: top.topcnchandlefield,
        topstatehandlefield: top.topstatehandlefield,
        topstartdatefield: start,
        topenddatefield: end,
        topdurationfield: duration
      } as TimelineDataEpoch;
      orderedTopsData.push(epochTop);
      orderedTopsData.sort((a, b) => {
        if (a.topstartdatefield < b.topstartdatefield) return -1
        return a.topstartdatefield > b.topstartdatefield ? 1 : 0
      })
      this.selectedTop = orderedTopsData[orderedTopsData.length - 1]
    }
  }
}
