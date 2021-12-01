import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TimelineService} from "../../../services/timeline.service";
import * as moment from 'moment';
import {State} from "../../../interfaces/status";

// Start ApexCharts Import
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import {TimelineData} from "../../../interfaces/timeline";
import {ActivatedRoute} from "@angular/router";
import {NestAPI_URL} from "../../../smcomconfig";
import {TokenStorageService} from "../../../services/token-storage.service";
import {HttpClient} from "@angular/common/http";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
// End ApexChart Import

@Component({
  selector: 'app-timeline-line',
  templateUrl: './timeline-line.component.html',
  styleUrls: ['./timeline-line.component.css']
})
export class TimelineLineComponent implements OnInit {

  // Chart variable
  id!: string | null;
  dataTimeline!: TimelineData[];
  series = [] as any;
  data: any[];
  isLoadingChart = true


  // For  cnc stats
  statsList!: State[]

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(private timelineService: TimelineService, private route: ActivatedRoute, private http: HttpClient, private storage: TokenStorageService) {
    this.id = this.route.snapshot.paramMap.get('id');
    // Timeline Chart Data
    this.series = [];
    this.data = [];
  }

  ngOnInit(): void {
    const self = this;
    setTimeout(function(){
      self.ngOnInit();
      console.log("refresh");
    }, 10000);
    // Get stats and create chart

  }
}
