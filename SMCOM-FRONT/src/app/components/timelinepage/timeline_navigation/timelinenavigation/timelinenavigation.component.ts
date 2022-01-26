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
  indexTopSelector = -1;
  orderedTopsData: TimelineDataEpoch[] = [];
  constructor() { }

  ngOnInit(): void {
    this.updateData();
  }

  getFormatDate(epoch: number): string {
    return moment(new Date(epoch * 1000)).format('DD/MM/YYYY')
  }
  getFormatTime(epoch: number): string {
    return moment(new Date(epoch * 1000)).format('HH:mm:ss')
  }
  goToPreviousTop(): void {
    console.log(this.indexTopSelector)
    if (this.indexTopSelector !== -1) {
      this.indexTopSelector--;
      this.updateDisplay()
    }
  }
  goToNextTop(): void {
    if (this.indexTopSelector < this.orderedTopsData.length - 1) {
      this.indexTopSelector++;
      this.updateDisplay()
    }
  }
  updateDisplay(): void {
    if (this.indexTopSelector === -1){ // si index non placé
      this.selectedTop = this.orderedTopsData[this.orderedTopsData.length - 1]
      this.indexTopSelector = this.orderedTopsData.length - 1;
    }
    else if (this.indexTopSelector > this.orderedTopsData.length - 1){ // si index supérieur au nombre d'états
      this.selectedTop = this.selectedTop = this.orderedTopsData[this.orderedTopsData.length - 1]
    } else
      this.selectedTop = this.orderedTopsData[this.indexTopSelector]
  }
  getFormatDuration(seconds: number): string {
    let d = Math.floor(seconds / (3600*24));
    let h = Math.floor(seconds % (3600*24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);
    let dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
    let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }
  /** Loads timeline and state data from the parent component, orders it by date and stores it in orderedTopsData */
  updateData(): void {
    this.statsList = this.stateData;
    const topsData = this.timelineData;
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
      this.orderedTopsData.push(epochTop);
      this.orderedTopsData.sort((a, b) => {
        if (a.topstartdatefield < b.topstartdatefield) return -1
        return a.topstartdatefield > b.topstartdatefield ? 1 : 0
      })
    }
    this.updateDisplay();
    console.log(this.indexTopSelector)
  }
}
