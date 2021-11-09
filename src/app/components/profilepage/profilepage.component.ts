import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import { UserService } from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  currentUser: string = "empty";
  constructor(private storage: TokenStorageService, private user: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user.getUserProfile().subscribe(
      data => {
        this.currentUser = data;
      },
      err => {
        this.currentUser = err.status;
        this.storage.signOut();
        this.router.navigate(['login']).then()


      }
    );
  }

}
