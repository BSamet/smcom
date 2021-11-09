import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timeline-period',
  templateUrl: './timeline-period.component.html',
  styleUrls: ['./timeline-period.component.css']
})
export class TimelinePeriodComponent implements OnInit {

  @Input() status!: string;
  @Input() name!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
