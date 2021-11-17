import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:any;
  constructor(private tokenStorage: TokenStorageService) { }
  menus = [false, false]
  isOpenedList = this.menus;
  toggle(index:number) {
    this.isOpenedList[index] = !this.isOpenedList[index];
  }
  closeMenu() {
    this.isOpenedList = this.menus;
  }
  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
  }

}
