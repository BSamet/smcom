import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  constructor(private language:LanguageService) { }

  ngOnInit(): void {
  }

  getTextFromKey(key:string){
    return this.language.getTextFromKey(key)
  }
}
