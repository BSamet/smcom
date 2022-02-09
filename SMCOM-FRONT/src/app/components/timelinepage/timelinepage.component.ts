import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {animCloseOpen, flyInOut} from "../../animations/animations";
import { LanguageService } from 'src/app/services/language.service';
import {TimelineService} from "../../services/timeline.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MOCKAPI_URL, NestAPI_URL} from "../../smcomconfig";
import {TokenStorageService} from "../../services/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {State} from "../../interfaces/status";
import {ActivatedRoute, Router} from "@angular/router";
import {TimelineData} from "../../interfaces/timeline";
import {DateRangeService} from "../../services/date-range.service";
import { ChangeDetectorRef } from '@angular/core';
import moment from "moment";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {LoadingdialogComponent} from "../loadingdialog/loadingdialog.component";

@Component({
  selector: 'app-timelinepage',
  templateUrl: './timelinepage.component.html',
  styleUrls: ['./timelinepage.component.css'],
  animations: [
    animCloseOpen,
    flyInOut
  ],
})
export class TimelinepageComponent implements OnInit {
  selectedDateInterval!: number;
  daysList!: Date[];
  isSideNavPin!: boolean;
  isShowKpi!: boolean;
  isShowTimeline!: boolean;
  id!:string | null
  timelineData: TimelineData[] = [];
  stateData: State[] = [];
  dateRange = Object.keys(dateRangeEnum);
  hasLoaded = false;
  dateRangeView!: any;
  start = new Date(this.timelineService.getDateStartingFromMidnight(new Date()).getTime() - 6*86400000);
  end = new Date(this.timelineService.getDateStartingFromMidnight(new Date()).getTime() + 86399000);
  dialogModal!: MatDialogRef<LoadingdialogComponent, any>;

  constructor(
    private language:LanguageService,
    private timelineService: TimelineService,
    private storage: TokenStorageService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private dateRangeService: DateRangeService<Date>,
    public dialog: MatDialog) {
      this.daysList = this.timelineService.getDaysArray(this.start, this.end);
  }
  getTextFromKey(key:string){
    return this.language.getTextFromKey(key)
  }
  openLoadingDialog(): void {
    this.dialogModal = this.dialog.open(LoadingdialogComponent, {
      width: '500px',
      //data: {name: this.name, animal: this.animal}
    });
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
    this.isShowKpi = false;
    this.isShowTimeline = true;
    this.isSideNavPin = false;
    this.dateRange = this.dateRange.slice(this.dateRange.length/2);
  }

  getData(){
    this.hasLoaded = false;
    const API_key = this.storage.getUser().API_key;
    let URL = NestAPI_URL;
    if (this.storage.getDataMode() === "MOCK")
      URL = MOCKAPI_URL
    this.http
      .get(URL + 'state', {
        headers: {
          API_key: API_key,
        },
      })
      .subscribe((statesData) => {
        this.stateData = statesData as State[];
        this.timelineService.timelineDataV2(this.id).subscribe((tops) => {
          this.timelineData = tops as TimelineData[];
          this.hasLoaded = true;
        })}, error => {
        if (error.error) {
          if (error.error.statusCode == 401){
            this.storage.signOut();
            this.router.navigate(['login/expired']).then();
          }
        }
      })

  }

  onRangeUpdate(dateItem: number){
    this.selectedDateInterval = dateItem;
    this.dateRangeService.changeRange(dateItem);
  }

  updateDays(days: Date[]) {
    this.daysList = days;
  }

  moveFastBackwards(){
    const newStart = this.timelineService.getDateStartingFromMidnight(moment(this.daysList[0].getTime()).subtract(this.daysList.length-1, 'days').toDate())
    const endDate = this.timelineService.getDateStartingFromMidnight(moment(newStart).add(this.daysList.length-1, 'days').toDate())
    this.daysList.splice(0, this.daysList.length)
    this.daysList.push(...this.timelineService.getDaysArray(newStart, endDate));
  }
  moveFastForward(){
    const newStart = this.timelineService.getDateStartingFromMidnight(moment(this.daysList[this.daysList.length-1].getTime()).toDate())
    const endDate = this.timelineService.getDateStartingFromMidnight(moment(newStart).add(this.daysList.length-1, 'days').toDate())
    this.daysList.splice(0, this.daysList.length)
    this.daysList.push(...this.timelineService.getDaysArray(newStart, endDate));
  }
  moveBackWards(){
    const newStart = this.timelineService.getDateStartingFromMidnight(moment(this.daysList[0].getTime()).subtract(1, 'days').toDate())
    this.daysList.pop();
    this.daysList.unshift(newStart)
  }
  moveForward(){
    const endDate = this.timelineService.getDateStartingFromMidnight(moment(this.daysList[this.daysList.length-1].getTime()).add(1, 'days').toDate())
    this.daysList.shift();
    this.daysList.push(endDate)
  }
}
export enum dateRangeEnum {
  "Day",
  "Week",
  "Month",
  "Year",
  "Custom"
}
