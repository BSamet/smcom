import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cnc-dashboard',
  templateUrl: './cnc-dashboard.component.html',
  styleUrls: ['./cnc-dashboard.component.css']
})
export class CncDashboardComponent implements OnInit {

  @Input() name!: string;
  @Input() status!: string;
  @Input() dncStatus!: string;
  @Input() prodStatus!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
