import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kpi-progressbar',
  templateUrl: './kpi-progressbar.component.html',
  styleUrls: ['./kpi-progressbar.component.css']
})
export class KpiProgressbarComponent implements OnInit {

  @Input() name!: string;
  @Input() value!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
