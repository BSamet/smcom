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
  // Config chart
  chartConfig= {
    height: 650,
    type: "rangeBar",
  }
  plotOptions= {
    bar: {
      horizontal: true,
      barHeight: "50%",
      rangeBarGroupRows: true,
    },
  }
  xaxis= {
    type: "datetime",
    labels: {
      datetimeUTC: false,
      style: {
        fontSize: '17px'
      }
    },
    // Pour afficher le temps sur une intervalle de -12h/+12h à partir de la date actuelle
    min : Date.now() - 43200000,
    max : Date.now() + 43200000,
  }
  yaxis= {
    labels: {
      style: {
        fontSize: '17px'
      }
    }
  }
  legend= {
    position: "top",
    horizontalAlign: "center",
    fontSize: "17px",
    onItemClick: {
      toggleDataSeries: true
    },
  }
  tooltip= {
    enabled: true,
    x: {
      format: 'dd MMMM HH:mm',
    },
  }
  title= {
    text: "",
    style: {
      fontSize: '20px'
    }
  }

  // For  cnc stats
  statsList!: State[]

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(private timelineService: TimelineService, private route: ActivatedRoute,private http: HttpClient, private storage: TokenStorageService) {
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
    const API_key = this.storage.getUser().API_key;
    this.http.get(NestAPI_URL + 'state', {headers: {
        API_key: API_key
      }}).subscribe(data=>{
      this.statsList=data as State[];
      let states = 0;
      for (let state of this.statsList) {
        this.timelineService.timelineData(state.Handle, this.id)
          .subscribe(data => {
            this.data = this.loadData(data, state.Name)
            this.series.push({name: state.Name, data: this.data, color: state.Color})
            states++
            if (states == this.statsList.length) {
              this.isLoadingChart = false
            }
            this.chartOptions = {
              series: this.series,
              chart: this.chartConfig,
              plotOptions: this.plotOptions,
              xaxis: this.xaxis,
              yaxis: this.yaxis,
              legend: this.legend,
              tooltip: this.tooltip,
              title: this.title
            };
          })
      }
    })
  }

  private loadData(dataInput: any, name: string) {
    const data = []
    for (let top of dataInput) {
      const start = moment(top.topstartdatefield, 'MM-DD-YYYY HH-mm-ss').unix()*1000
      const end = moment(top.topenddatefield, 'MM-DD-YYYY HH-mm-ss').unix()*1000
      data.push(
        {
          x: name,
          y: [
            start,
            end
          ]
        }
      )
    }
    return data
  }

}
