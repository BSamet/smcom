import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TimelineService} from "../../services/timeline.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoadingdialogComponent} from "../loadingdialog/loadingdialog.component";

@Component({
  selector: 'custom-date-selector',
  templateUrl: './custom-date-selector.component.html',
  styleUrls: ['./custom-date-selector.component.css']
})
export class CustomDateSelectorComponent implements OnInit {
  @Input() dayList!: Date[];
  @Output() timelineUpdated = new EventEmitter();
  dialogModal!: MatDialogRef<LoadingdialogComponent, any>;
  customRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(private timelineService: TimelineService, public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  openLoadingDialog(): void {
    this.dialogModal = this.dialog.open(LoadingdialogComponent, {
      width: '500px',
      //data: {name: this.name, animal: this.animal}
    });
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

  updateTimelines() {
    this.dayList = this.timelineService.getDaysArray(this.customRange.value.start, this.customRange.value.end);
  }
}
