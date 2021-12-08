import { Component, OnInit } from '@angular/core';
import {flyInOut} from "../../../../animations/animations";

@Component({
  selector: 'app-timelinenavigation',
  templateUrl: './timelinenavigation.component.html',
  styleUrls: ['./timelinenavigation.component.css'],
  animations: [
    flyInOut
  ]
})
export class TimelinenavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
