import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TimelineService } from '../../../services/timeline.service';
import moment from 'moment';
import { State } from '../../../interfaces/status';

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
  @Input() day!: string;
  // Chart variable
  id!: string | null;
  dataTimeline!: TimelineData[];
  series = [] as any;
  data: any[];
  isLoadingChart = true;

  chartConfig = {
    toolbar: { show: false },
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
  statsList!: State[];

  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(
    private timelineService: TimelineService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: TokenStorageService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    // Timeline Chart Data
    this.series = [];
    this.data = [];
  }

  updateTimeline() {
    const dayDate = new Date(parseInt(this.day));
    const API_key = this.storage.getUser().API_key;

    const xaxis = {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
      },
      min: dayDate.getTime(),
      max: dayDate.getTime() + 86399000

    };

    this.http
      .get(NestAPI_URL + 'state', {
        headers: {
          API_key: API_key,
        },
      })
      .subscribe((states) => {
        this.statsList = states as State[];
        this.timelineService.timelineDataV2(this.id).subscribe((tops) => {
          const topsData = tops as TimelineData[];
          const day = this.timelineService.dayOfWeekAsString(dayDate.getDay())
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
                data: [{ x: day.substring(0, 3) + ' ' + moment(dayDate).format('DD/MM'), y: [start, end] }],
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
                data: [{ x: day.substring(0, 3) + ' ' + moment(dayDate).format('DD/MM'), y: [start, end] }],
                color: this.statsList[top.topstatehandlefield].Color,
              });
            }
          }
          /*this.series.push({
            name: state.Name,
            data: this.data,
            color: state.Color,
          });*/
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
        });
      }, error => {
        if (error.error) {
          if (error.error.statusCode == 401){
            this.storage.signOut();
            this.router.navigate(['login/expired']).then();
          }
        }
      });
  }

  ngOnInit(): void {
    /* this.series = [
      {
        name: 'Setup',
        data: [
          {
            x: this.timelineService.dayOfWeekAsString(dayDate.getDay()),
            y: [1638774000000, 1638774664000],
          },
        ],
      },
    ]; */
    this.updateTimeline();

    const self = this;
    setTimeout(function () {
      self.ngOnInit();
    }, 60000);
    // Get stats and create chart
  }
}