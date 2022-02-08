import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TimelineService} from "../../services/timeline.service";

@Component({
  selector: 'custom-date-selector',
  templateUrl: './custom-date-selector.component.html',
  styleUrls: ['./custom-date-selector.component.css']
})
export class CustomDateSelectorComponent implements OnInit {
  @Input() dayList!: Date[];
  @Output() timelineUpdated = new EventEmitter();

  customRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(private timelineService: TimelineService) { }

  ngOnInit(): void {
  }

  timelineUpdate(){
    this.updateTimelines();
    this.timelineUpdated.emit(this.dayList);
  }

  updateTimelines() {
    this.dayList = this.timelineService.getDaysArray(this.customRange.value.start, this.customRange.value.end);
    this.customRange.setValue({start: this.dayList[0], end: this.dayList[this.dayList.length - 1]});
  }
}
