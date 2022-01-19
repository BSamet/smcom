import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:any;
  constructor(private tokenStorage: TokenStorageService,private language:LanguageService) { }
  menus = [false, false]
  languageLoad=this.language
  isOpenedList = this.menus;
  dataLIVEMode = this.tokenStorage.getDataMode() === 'LIVE';
  toggle(index:number) {
    this.isOpenedList[index] = !this.isOpenedList[index];
  }
  closeMenu() {
    this.isOpenedList = this.menus;
  }
  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
  }
  getTextFromKey(key:string){
    return this.language.getTextFromKey(key)
  }
  changeLan(lankey:string){
    this.tokenStorage.saveLanguage(lankey)
  }
  getCurrentLan(){
    return this.tokenStorage.getLanguage()
  }
  switchDataMode(){
    if (this.dataLIVEMode)
      this.tokenStorage.setDataMode('LIVE')
    else
      this.tokenStorage.setDataMode('MOCK')
    window.location.reload();
  }
}
