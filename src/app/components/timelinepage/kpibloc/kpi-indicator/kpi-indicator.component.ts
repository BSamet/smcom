import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kpi-indicator',
  templateUrl: './kpi-indicator.component.html',
  styleUrls: ['./kpi-indicator.component.css']
})
export class KpiIndicatorComponent implements OnInit {

  @Input() name!: string;
  @Input() value!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
