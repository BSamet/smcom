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
    const self = this;
    setTimeout(function(){
      self.ngOnInit();
      console.log("refresh");
    }, 10000);
  }

  // Color for circle when data is under ...
  currentColor() {
    if (this.value <= 20) {
      return '#FF1919';
    } else if (this.value <= 50) {
      return '#FFAE19';
    } else if (this.value <= 80) {
      return '#329932'
    } else {
      return '#3b82f6';
    }
  }
}
