import { Component, OnInit } from '@angular/core';
import {animCloseOpen, flyInOut} from "../../animations/animations";
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-timelinepage',
  templateUrl: './timelinepage.component.html',
  styleUrls: ['./timelinepage.component.css'],
  animations: [
    animCloseOpen,
    flyInOut
  ]
})
export class TimelinepageComponent implements OnInit {

  isShowKpi!: boolean;
  isShowTimeline!: boolean;

  constructor(private language:LanguageService) { }

  ngOnInit(): void {
    this.isShowKpi = false;
    this.isShowTimeline = true;
  }

  getTextFromKey(key:string){
    return this.language.getTextFromKey(key)
  }
  toggleShowKpi() {
    this.isShowKpi = ! this.isShowKpi;
  }
  toggleShowTimeline() {
    this.isShowTimeline = ! this.isShowTimeline;
  }
}
