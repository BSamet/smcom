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
import { ActivatedRoute } from '@angular/router';
import { NestAPI_URL } from '../../../smcomconfig';
import { TokenStorageService } from '../../../services/token-storage.service';
import { HttpClient } from '@angular/common/http';

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
  xaxis = {
    type: 'datetime',
  };
  yaxis = {
    labels: {
      style: {
        fontSize: '17px',
      },
    },
  };

  legend = {
    show: false,
  };
  tooltip = {
    custom: function (opts: any) {
      const fromYear = new Date(opts.y1).getFullYear();
      const toYear = new Date(opts.y2).getFullYear();
      const values = opts.ctx.rangeBar.getTooltipValues(opts);

      return (
        '<div class="apexcharts-tooltip-rangebar">' +
        '<div> <span class="series-name" style="color: ' +
        values.color +
        '">' +
        (values.seriesName ? values.seriesName : '') +
        '</span></div>' +
        '<div> <span class="category">' +
        values.ylabel +
        ' </span> <span class="value start-value">' +
        fromYear +
        '</span> <span class="separator">-</span> <span class="value end-value">' +
        toYear +
        '</span></div>' +
        '</div>'
      );
    },
  };
  // For  cnc stats
  statsList!: State[];

  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(
    private timelineService: TimelineService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: TokenStorageService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    // Timeline Chart Data
    this.series = [];
    this.data = [];
  }


  updateTimeline() {
    const dayDate = new Date(parseInt(this.day));
    const API_key = this.storage.getUser().API_key;
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
          for (let top of topsData){
            let start = moment(top.topstartdatefield, 'MM-DD-YYYY HH-mm-ss').unix()*1000
            let end = moment(top.topenddatefield, 'MM-DD-YYYY HH-mm-ss').unix()*1000

            if ((start > dayDate.getTime() && start < dayDate.getTime() + 86400000) || (end > dayDate.getTime() && end < dayDate.getTime() + 86400000)){
              if (start < dayDate.getTime()) start = dayDate.getTime()
              if (end > dayDate.getTime() + 86400000) end = dayDate.getTime()
            }
            this.series.push(
              {
                name:this.statsList[top.topstatehandlefield].Name,
                data:[
                  {
                    // x:this.timelineService.dayOfWeekAsString(moment(top.topstartdatefield, 'MM-DD-YYYY HH-mm-ss').toDate().getDay()),
                    x:moment(dayDate).format("DD/MM"),
                    y:[start, end]
                  }
                ]
              }
            )

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
            xaxis: this.xaxis,
            yaxis: this.yaxis,
            legend: this.legend,
            tooltip: this.tooltip,
            title: this.title,
          };
          this.isLoadingChart = false;
        });
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
      console.log('refresh');
    }, 60000);
    // Get stats and create chart
  }
}
