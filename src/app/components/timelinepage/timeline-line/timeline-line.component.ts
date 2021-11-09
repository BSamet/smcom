import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timeline-line',
  templateUrl: './timeline-line.component.html',
  styleUrls: ['./timeline-line.component.css']
})
export class TimelineLineComponent implements OnInit {

  timelineWidth!: number;
  timelineHour!: number;
  @Input() month!: string;
  @Input() dayNumber!: string;
  @Input() day!: string;
  @Input() year!: string;


  constructor() { }

  ngOnInit(): void {
    this.timelineWidth = (window.innerWidth / 12) * 11;
    this.timelineHour = this.timelineWidth / 24;
  }

}
