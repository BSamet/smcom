import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TimelineService } from '../../../services/timeline.service';
import moment from 'moment';
import { State } from '../../../interfaces/status';
import { LanguageService } from 'src/app/services/language.service';

// Start ApexCharts Import
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { TimelineData } from '../../../interfaces/timeline';
import {ActivatedRoute, Router} from '@angular/router';
import { NestAPI_URL } from '../../../smcomconfig';
import { TokenStorageService } from '../../../services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import {animCloseOpen, flyInOut} from "../../../animations/animations";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  colors: string[];
  tooltip: ApexTooltip;
};
// End ApexChart Import

@Component({
  selector: 'app-timeline-line',
  templateUrl: './timeline-line.component.html',
  styleUrls: ['./timeline-line.component.css'],
  animations: [
    flyInOut
  ]
})
export class TimelineLineComponent implements OnInit {
  @Input() day!: number;
  // Chart variable
  id!: string | null;
  dataTimeline!: TimelineData[];
  series = [] as any;
  data: any[];
  isLoadingChart = true;
  noData = false;

  chartConfig = {
    toolbar: { show: true },
    height: 100,
    type: 'rangeBar',
  };
  title = {
    text: '',
    style: {
      fontSize: '20px',
    },
  };

  plotOptions = {
    bar: {
      horizontal: true,
      barHeight: '80%',
      rangeBarGroupRows: true,
    },
  };
  fill = {
    type: 'solid',
  };

  yaxis = {
    labels: {
      style: {
        fontSize: '17px',
      },
    },
  };
  tooltip = {
    enabled: true,
    x: {
      format: 'HH:mm',
    },
  };

  legend = {
    show: false,
  };

  // For  cnc stats
  statsList: State[] = [];
  dayString = "";
  @ViewChild('chart') chart: ChartComponent | undefined;
  @Input() timelineData: TimelineData[] = [];
  @Input() stateData: State[] = [];
  public chartOptions: Partial<ChartOptions> | any;

  constructor(
    private timelineService: TimelineService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: TokenStorageService,
    private router: Router,
    private language:LanguageService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    // Timeline Chart Data




    this.series = [];
    this.data = [];

  }

  updateTimeline() {
    const dayDate = new Date(this.day);
    this.dayString = this.timelineService.dayOfWeekAsString(dayDate.getDay()) + " " + moment(dayDate).format('DD/MM');
    const xaxis = {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
      },
      min: dayDate.getTime(),
      max: dayDate.getTime() + 86399000

    };

    this.statsList = this.stateData;
    const topsData = this.timelineData;
    for (let top of topsData) {
      let start =
        moment(top.topstartdatefield, 'MM-DD-YYYY HH-mm-ss').unix() *
        1000;
      let end =
        moment(top.topenddatefield, 'MM-DD-YYYY HH-mm-ss').unix() * 1000;
      if (top.topdurationfield == 0){
        end = Date.now()
      }
      if (
        (start > dayDate.getTime() &&
          start < dayDate.getTime() + 86400000) ||
        (end > dayDate.getTime() && end < dayDate.getTime() + 86400000)
      ) {
        if (start < dayDate.getTime()) start = dayDate.getTime();
        if (end > dayDate.getTime() + 86399000)
          end = dayDate.getTime() + 86399000;
        this.series.push({
          name: this.statsList[top.topstatehandlefield].Name,
          data: [{ x: this.dayString.substring(0, 3) + ' ' + moment(dayDate).format('DD/MM'), y: [start, end] }],
          color: this.statsList[top.topstatehandlefield].Color,
        });
      } else if (
        start < dayDate.getTime() &&
        end > dayDate.getTime() + 86400000
      ) {
        start = dayDate.getTime();
        end = dayDate.getTime() + 86399000;

        this.series.push({
          name: this.statsList[top.topstatehandlefield].Name,
          data: [{ x: this.dayString.substring(0, 3) + ' ' + moment(dayDate).format('DD/MM'), y: [start, end] }],
          color: this.statsList[top.topstatehandlefield].Color,
        });
      }
    }
    this.chartOptions = {
      series: this.series,
      chart: this.chartConfig,
      plotOptions: this.plotOptions,
      xaxis: xaxis,
      yaxis: this.yaxis,
      legend: this.legend,
      tooltip: this.tooltip,
      title: this.title,
    };
    this.isLoadingChart = false;
  }

  ngOnInit(): void {
    this.updateTimeline();

    const self = this;
    setTimeout(function () {
      self.ngOnInit();
    }, 60000);
  }
  getTextFromKey(key:string){
    return this.language.getTextFromKey(key)
  };

}
