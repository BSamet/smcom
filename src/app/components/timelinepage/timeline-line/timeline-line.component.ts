import {Component, Input, OnInit, ViewChild} from '@angular/core';

// Start ApexCharts Import
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

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

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;


  constructor() {
    // Timeline Chart Data
    this.chartOptions = {
      series: [
        {
          name: "Production",
          data: [
            {
              x: "Lundi",
              y: [
                new Date("2019-03-05 08:00:00").getTime(),
                new Date("2019-03-05 11:00:00").getTime()
              ]
            },
            {
              x: "Lundi",
              y: [
                new Date("2019-03-05 15:00:00").getTime(),
                new Date("2019-03-05 17:00:00").getTime()
              ]
            },
            {
              x: "Mardi",
              y: [
                new Date("2019-03-05 08:00:00").getTime(),
                new Date("2019-03-05 11:00:00").getTime()
              ]
            },
            {
              x: "Mardi",
              y: [
                new Date("2019-03-05 15:00:00").getTime(),
                new Date("2019-03-05 17:00:00").getTime()
              ]
            },
            {
              x: "Mercredi",
              y: [
                new Date("2019-03-05 08:00:00").getTime(),
                new Date("2019-03-05 11:00:00").getTime()
              ]
            },
            {
              x: "Mercredi",
              y: [
                new Date("2019-03-05 15:00:00").getTime(),
                new Date("2019-03-05 17:00:00").getTime()
              ]
            },
            {
              x: "Jeudi",
              y: [
                new Date("2019-03-05 08:00:00").getTime(),
                new Date("2019-03-05 11:00:00").getTime()
              ]
            },
            {
              x: "Jeudi",
              y: [
                new Date("2019-03-05 15:00:00").getTime(),
                new Date("2019-03-05 17:00:00").getTime()
              ]
            },
            {
              x: "Vendredi",
              y: [
                new Date("2019-03-05 08:00:00").getTime(),
                new Date("2019-03-05 11:00:00").getTime()
              ]
            },
            {
              x: "Vendredi",
              y: [
                new Date("2019-03-05 15:00:00").getTime(),
                new Date("2019-03-05 17:00:00").getTime()
              ]
            },
            {
              x: "Samedi",
              y: [
                new Date("2019-03-05 08:00:00").getTime(),
                new Date("2019-03-05 11:00:00").getTime()
              ]
            },
            {
              x: "Samedi",
              y: [
                new Date("2019-03-05 15:00:00").getTime(),
                new Date("2019-03-05 17:00:00").getTime()
              ]
            },
            {
              x: "Dimanche",
              y: [
                new Date("2019-03-05 08:00:00").getTime(),
                new Date("2019-03-05 11:00:00").getTime()
              ]
            },
            {
              x: "Dimanche",
              y: [
                new Date("2019-03-05 15:00:00").getTime(),
                new Date("2019-03-05 17:00:00").getTime()
              ]
            },
          ],
          color: "#329932"
        },
        {
          name: "Failure",
          data: [
            {
              x: "Lundi",
              y: [
                new Date("2019-03-05 11:00:00").getTime(),
                new Date("2019-03-05 13:00:00").getTime()
              ]
            },
            {
              x: "Mardi",
              y: [
                new Date("2019-03-05 11:00:00").getTime(),
                new Date("2019-03-05 13:00:00").getTime()
              ]
            },
            {
              x: "Mercredi",
              y: [
                new Date("2019-03-05 11:00:00").getTime(),
                new Date("2019-03-05 13:00:00").getTime()
              ]
            },
            {
              x: "Jeudi",
              y: [
                new Date("2019-03-05 11:00:00").getTime(),
                new Date("2019-03-05 13:00:00").getTime()
              ]
            },
            {
              x: "Vendredi",
              y: [
                new Date("2019-03-05 11:00:00").getTime(),
                new Date("2019-03-05 13:00:00").getTime()
              ]
            },
            {
              x: "Samedi",
              y: [
                new Date("2019-03-05 11:00:00").getTime(),
                new Date("2019-03-05 13:00:00").getTime()
              ]
            },
            {
              x: "Dimanche",
              y: [
                new Date("2019-03-05 11:00:00").getTime(),
                new Date("2019-03-05 13:00:00").getTime()
              ]
            },
          ],
          color: "#FF1919"
        },
        {
          name: "Setup",
          data: [
            {
              x: "Lundi",
              y: [
                new Date("2019-03-05 14:00:00").getTime(),
                new Date("2019-03-05 15:00:00").getTime()
              ]
            },
            {
              x: "Mardi",
              y: [
                new Date("2019-03-05 14:00:00").getTime(),
                new Date("2019-03-05 15:00:00").getTime()
              ]
            },
            {
              x: "Mercredi",
              y: [
                new Date("2019-03-05 14:00:00").getTime(),
                new Date("2019-03-05 15:00:00").getTime()
              ]
            },
            {
              x: "Jeudi",
              y: [
                new Date("2019-03-05 14:00:00").getTime(),
                new Date("2019-03-05 15:00:00").getTime()
              ]
            },
            {
              x: "Vendredi",
              y: [
                new Date("2019-03-05 14:00:00").getTime(),
                new Date("2019-03-05 15:00:00").getTime()
              ]
            },
            {
              x: "Samedi",
              y: [
                new Date("2019-03-05 14:00:00").getTime(),
                new Date("2019-03-05 15:00:00").getTime()
              ]
            },
            {
              x: "Dimanche",
              y: [
                new Date("2019-03-05 14:00:00").getTime(),
                new Date("2019-03-05 15:00:00").getTime()
              ]
            },
          ],
          color: "#3b82f6"
        },
        {
          name: "Idle",
          data: [
            {
              x: "Lundi",
              y: [
                new Date("2019-03-05 13:00:00").getTime(),
                new Date("2019-03-05 14:00:00").getTime()
              ]
            },
            {
              x: "Mardi",
              y: [
                new Date("2019-03-05 13:00:00").getTime(),
                new Date("2019-03-05 14:00:00").getTime()
              ]
            },
            {
              x: "Mercredi",
              y: [
                new Date("2019-03-05 13:00:00").getTime(),
                new Date("2019-03-05 14:00:00").getTime()
              ]
            },
            {
              x: "Jeudi",
              y: [
                new Date("2019-03-05 13:00:00").getTime(),
                new Date("2019-03-05 14:00:00").getTime()
              ]
            },
            {
              x: "Vendredi",
              y: [
                new Date("2019-03-05 13:00:00").getTime(),
                new Date("2019-03-05 14:00:00").getTime()
              ]
            },
            {
              x: "Samedi",
              y: [
                new Date("2019-03-05 13:00:00").getTime(),
                new Date("2019-03-05 14:00:00").getTime()
              ]
            },
            {
              x: "Dimanche",
              y: [
                new Date("2019-03-05 13:00:00").getTime(),
                new Date("2019-03-05 14:00:00").getTime()
              ]
            },
          ],
          color: "#FFAE19"
        },
        {
          name: "Disengagement",
          data: [
            {
              x: "Lundi",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-05 08:00:00").getTime()
              ]
            },
            {
              x: "Lundi",
              y: [
                new Date("2019-03-05 17:00:00").getTime(),
                new Date("2019-03-06").getTime()
              ]
            },
            {
              x: "Mardi",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-05 08:00:00").getTime()
              ]
            },
            {
              x: "Mardi",
              y: [
                new Date("2019-03-05 17:00:00").getTime(),
                new Date("2019-03-06").getTime()
              ]
            },
            {
              x: "Mercredi",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-05 08:00:00").getTime()
              ]
            },
            {
              x: "Mercredi",
              y: [
                new Date("2019-03-05 17:00:00").getTime(),
                new Date("2019-03-06").getTime()
              ]
            },
            {
              x: "Jeudi",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-05 08:00:00").getTime()
              ]
            },
            {
              x: "Jeudi",
              y: [
                new Date("2019-03-05 17:00:00").getTime(),
                new Date("2019-03-06").getTime()
              ]
            },
            {
              x: "Vendredi",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-05 08:00:00").getTime()
              ]
            },
            {
              x: "Vendredi",
              y: [
                new Date("2019-03-05 17:00:00").getTime(),
                new Date("2019-03-06").getTime()
              ]
            },
            {
              x: "Samedi",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-05 08:00:00").getTime()
              ]
            },
            {
              x: "Samedi",
              y: [
                new Date("2019-03-05 17:00:00").getTime(),
                new Date("2019-03-06").getTime()
              ]
            },
            {
              x: "Dimanche",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-05 08:00:00").getTime()
              ]
            },
            {
              x: "Dimanche",
              y: [
                new Date("2019-03-05 17:00:00").getTime(),
                new Date("2019-03-06").getTime()
              ]
            },
          ],
          color: "#BFBFBF"
        },
      ],
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
  }

  ngOnInit(): void {
    setTimeout(function(){
      window.location.reload();
    }, 10000);
  }

}
