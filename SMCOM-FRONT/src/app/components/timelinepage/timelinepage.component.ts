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
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDateRangeSelectionStrategy
} from "@angular/material/datepicker";
import {DateRangeService} from "../../services/date-range.service";

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
      useClass: TimelinepageComponent,
    },
  ],
})
export class TimelinepageComponent<D> implements OnInit, MatDateRangeSelectionStrategy<Date> {
  end!: Date | null;

  daysList!: Date[];
  isSideNavPin!: boolean;
  isShowKpi!: boolean;
  isShowTimeline!: boolean;
  id!:string | null
  timelineData: TimelineData[] = [];
  stateData: State[] = [];
  dateRange: string[] = ["Jour","Semaine","Mois","Année"];
  hasLoaded = false;

  constructor(
    private language:LanguageService,
    private timelineService: TimelineService,
    private storage: TokenStorageService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private dateRangeService: DateRangeService<Date>) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
    this.initTimelines();
    this.isShowKpi = false;
    this.isShowTimeline = true;
    this.isSideNavPin = false;

  }

  toggleSideNavPin() {
    this.isSideNavPin = ! this.isSideNavPin;
  }

  updateTimelines(start: Date, end: Date) {
    this.daysList = this.timelineService.getDaysArray(new Date(start), new Date(end));
  }

  getData(){
    this.hasLoaded = false;
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

  onRangeUpdate(dateItem: string){
    this.dateRangeService.changeRange(dateItem);
  }

  createPreview(activeDate: Date | null): DateRange<Date> {
    return this.dateRangeService.checkRange(<Date>activeDate);
  }

  selectionFinished(date: Date | null): DateRange<Date> {
    const selection = this.dateRangeService.checkRange(<Date>date);
    this.end = selection.end;
    this.updateTimelines(<Date>selection.start, <Date>selection.end);
    return this.dateRangeService.checkRange(<Date>date);
  }

  private initTimelines() {
    const start = new Date(this.timelineService.getDateStartingFromMidnight(new Date()).getTime() - 6*86400000);
    this.end = new Date(this.timelineService.getDateStartingFromMidnight(new Date()).getTime() + 86399000);
    this.updateTimelines(start, this.end);
  }
}
