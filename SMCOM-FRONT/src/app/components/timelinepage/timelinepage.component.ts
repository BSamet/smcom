import {Component, Input, OnInit} from '@angular/core';
import {animCloseOpen, flyInOut} from "../../animations/animations";
import { LanguageService } from 'src/app/services/language.service';
import {TimelineService} from "../../services/timeline.service";
import {FormControl, FormGroup} from "@angular/forms";
import {NestAPI_URL} from "../../smcomconfig";
import {TokenStorageService} from "../../services/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {State} from "../../interfaces/status";
import {ActivatedRoute, Router} from "@angular/router";
import {TimelineData} from "../../interfaces/timeline";
import {MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";
import {
  DayRangeSelectionStrategy
} from "../date-range-picker-selection-strategy/date-range-picker-selection-strategy.component";
import {DaterangepickerService} from "../../services/daterangepicker.service";

@Component({
  selector: 'app-timelinepage',
  templateUrl: './timelinepage.component.html',
  styleUrls: ['./timelinepage.component.css'],
  animations: [
    animCloseOpen,
    flyInOut
  ],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DayRangeSelectionStrategy,
    },
  ],
})
export class TimelinepageComponent<D> implements OnInit {
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

  daysList: Date[] | undefined;
  isSideNavPin!: boolean;
  isShowKpi!: boolean;
  isShowTimeline!: boolean;
  id!:string | null
  timelineData: TimelineData[] = [];
  stateData: State[] = [];
  dateRange: string[] = ["Jour","Semaine","Mois","Année"];

  constructor(
    private language:LanguageService,
    private timelineService: TimelineService,
    private storage: TokenStorageService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private dateRangeService: DaterangepickerService<D>) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
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

  getData(){
    const API_key = this.storage.getUser().API_key;
    let URL = NestAPI_URL;
    if (this.storage.getDataMode() === "MOCK")
      URL = "http://localhost:3000/"
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
        })}, error => {
        if (error.error) {
          if (error.error.statusCode == 401){
            this.storage.signOut();
            this.router.navigate(['login/expired']).then();
          }
        }
      })

  }

  onRangeUpdate(dateItem: string){
    this.dateRangeService.changeRange(dateItem);
  }
}
