import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDateRangeSelectionStrategy
} from "@angular/material/datepicker";
import {DateRangeService} from "../../services/date-range.service";
import {TimelineService} from "../../services/timeline.service";
import {FormControl, FormGroup} from "@angular/forms";
import {dateRangeEnum} from "../timelinepage/timelinepage.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoadingdialogComponent} from "../loadingdialog/loadingdialog.component";

@Component({
  selector: 'preset-date-selector',
  templateUrl: './preset-date-selector.component.html',
  styleUrls: ['./preset-date-selector.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: PresetDateSelectorComponent,
    },
  ],
})
export class PresetDateSelectorComponent<D> implements OnInit, MatDateRangeSelectionStrategy<Date> {
  @Input() interval!: number;
  @Input() dayList!: Date[];
  @Output() timelineUpdated = new EventEmitter();
  dialogModal!: MatDialogRef<LoadingdialogComponent, any>;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private dateRangeService: DateRangeService<Date>,
    private timelineService: TimelineService,
    public dialog: MatDialog) { }

  selectionFinished(date: Date | null, currentRange: DateRange<Date>, event: Event): DateRange<Date> {
    return this.dateRangeService.checkRange(<Date>date);
  }

  createPreview(activeDate: Date | null, currentRange: DateRange<Date>, event: Event): DateRange<Date> {
    return this.dateRangeService.checkRange(<Date>activeDate);
  }

  ngOnInit(): void {
  }
  openLoadingDialog(): void {
    this.dialogModal = this.dialog.open(LoadingdialogComponent, {
      width: '500px',
      //data: {name: this.name, animal: this.animal}
    });
  }

  updateTimelines() {
    this.dayList = this.timelineService.getDaysArray(this.range.value.start, this.range.value.end);
    this.range.setValue({start: this.dayList[0], end: this.dayList[this.dayList.length - 1]});
  }

  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then();
  }
  timelineUpdate(){
    this.openLoadingDialog();
    this.delay(500).then(r => {
      this.updateTimelines();
      this.timelineUpdated.emit(this.dayList);
      this.dialog.closeAll();
    });

  }

  onSelectionUpdate() {
    if (this.interval == dateRangeEnum.Month) {
      this.dateRangeService.changeRange(this.interval);
      return "year";
    } else if (this.interval == dateRangeEnum.Year) {
      this.dateRangeService.changeRange(this.interval);
      return "multi-year";
    } else return "month";
  }

  consolelog() {
    console.log(this.range.value.start + "\n");
    console.log(this.range.value.end);
  }
}
