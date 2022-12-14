import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  form: any = {
  username: "",
  password: ""
};
  isLoggedIn = false;
  isLoginFailed = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const err = this.route.snapshot.paramMap.get('err');
    if (err=="unauthorized"){
      this.isLoginFailed=true;
      this.errorMessage ="Veuillez vous connecter pour accéder à cette page !"
    }
    if (err=="expired"){
      this.isLoginFailed=true;
      this.errorMessage ="Votre session est expirée !"
    }
    if (this.tokenStorage.getToken() != null) {
      this.isLoggedIn = true;
      this.router.navigate(['']).then();
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.isLoading = true;
        this.tokenStorage.saveToken(data.access_token);
        this.userService.getUserProfile().subscribe(data => {
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        })

      },
      err => {
        if (err.error){
          this.errorMessage = err.error.message;
          this.errorMessage = "Connexion échouée"
        } else this.errorMessage = "Erreur inconnue !"
        this.isLoginFailed = true;
        this.isLoading = false;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
