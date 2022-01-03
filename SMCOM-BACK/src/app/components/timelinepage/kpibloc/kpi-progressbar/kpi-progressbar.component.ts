import {Component, Input, OnInit} from '@angular/core';
import {flyInOut} from "../../../../animations/animations";

@Component({
  selector: 'app-kpi-progressbar',
  templateUrl: './kpi-progressbar.component.html',
  styleUrls: ['./kpi-progressbar.component.css'],
  animations: [
    flyInOut
  ]
})
export class KpiProgressbarComponent implements OnInit {

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
}
