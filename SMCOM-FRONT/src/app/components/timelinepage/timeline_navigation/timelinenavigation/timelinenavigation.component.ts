import { Component, OnInit } from '@angular/core';
import {flyInOut} from "../../../../animations/animations";
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-timelinenavigation',
  templateUrl: './timelinenavigation.component.html',
  styleUrls: ['./timelinenavigation.component.css'],
  animations: [
    flyInOut
  ]
})
export class TimelinenavigationComponent implements OnInit {

  constructor( private language:LanguageService) { }

  ngOnInit(): void {
  }
  getTextFromKey(key:string){
    return this.language.getTextFromKey(key)
  };

}
