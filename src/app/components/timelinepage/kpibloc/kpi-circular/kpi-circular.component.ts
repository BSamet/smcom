import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-circular',
  templateUrl: './kpi-circular.component.html',
  styleUrls: ['./kpi-circular.component.css']
})
export class KpiCircularComponent implements OnInit {

  @Input() name!: string;
  @Input() value!: number;

  constructor() { }

  ngOnInit(): void {
  }

  currentColor() {
    if (this.value <= 20) {
      return 'red';
    } else if (this.value <= 50) {
      return 'orange';
    } else {
      return 'currentColor';
    }
  }
}
