import { Component, OnInit, Input } from '@angular/core';
import {flyInOut} from "../../../../animations/animations";

@Component({
  selector: 'app-kpi-circular',
  templateUrl: './kpi-circular.component.html',
  styleUrls: ['./kpi-circular.component.css'],
  animations: [
    flyInOut
  ]
})
export class KpiCircularComponent implements OnInit {

  @Input() name!: string;
  @Input() value!: number;

  constructor() { }

  ngOnInit(): void {
  }

  // Color for circle when data is under ...
  currentColor() {
    if (this.value <= 20) {
      return '#EC644B';
    } else if (this.value <= 50) {
      return '#F5D76E';
    } else if (this.value <= 80) {
      return '#87D37C'
    } else {
      return '#3498DB';
    }
  }
}
