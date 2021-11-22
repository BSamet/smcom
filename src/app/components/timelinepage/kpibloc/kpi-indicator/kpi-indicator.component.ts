import {Component, Input, OnInit} from '@angular/core';
import {flyInOut} from "../../../../animations/animations";

@Component({
  selector: 'app-kpi-indicator',
  templateUrl: './kpi-indicator.component.html',
  styleUrls: ['./kpi-indicator.component.css'],
  animations: [
    flyInOut
  ]
})
export class KpiIndicatorComponent implements OnInit {

  @Input() name!: string;
  @Input() value!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
