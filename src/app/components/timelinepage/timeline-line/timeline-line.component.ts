import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TimelineService} from "../../../services/timeline.service";
import * as moment from 'moment';

// Start ApexCharts Import
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import {TimelineData} from "../../../interfaces/timeline";

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

  dataTimeline!: TimelineData[];
  series = [] as any;
  data: any[];

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(private timelineService: TimelineService) {
    // Timeline Chart Data
    this.series = [];
    this.data = [];
  }

  ngOnInit(): void {
    this.timelineService.timelineData()
      .subscribe(data => {
        this.dataTimeline = data as TimelineData[]
        console.log(this.dataTimeline);
        for (let top of this.dataTimeline) {
          const start = moment(top.topstartdatefield, 'DD-MM-YYYY HH-mm-ss').format('YYYY-MM-DD HH-mm-ss')
          const end = moment(top.topenddatefield, 'DD-MM-YYYY HH-mm-ss').format('YYYY-MM-DD HH-mm-ss')
          this.data.push(
            [
              {
                x: top.topstatehandlefield,
                y: [
                  start,
                  end
                ]
              }
            ]
          )
        }

        this.series.push({name: "Production", data: this.data, color: "#329932"})
        console.log(this.series)
        this.chartOptions = {
          series:
          this.series,
          chart: {
            height: 650,
            type: "rangeBar",
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "50%",
              rangeBarGroupRows: true,
            },
          },
          xaxis: {
            type: "datetime",
            labels: {
              style: {
                fontSize: '17px'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '17px'
              }
            }
          },
          legend: {
            position: "top",
            horizontalAlign: "center",
            fontSize: "17px",
            onItemClick: {
              toggleDataSeries: true
            },
          },
          tooltip: {
            enabled: true,
            x: {
              format: 'dd MMMM HH:mm',
            },
          },
          title: {
            text: 'Semaine 1, Du 01/02/2021 au 07/02/2021',
            style: {
              fontSize: '20px'
            }
          }
        };
      });
  }


}
