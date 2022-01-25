import { Injectable } from '@angular/core';
import { Ability, AbilityBuilder } from '@casl/ability';
import { TokenStorageService } from './token-storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {

  constructor(private ability: Ability, private tokenStorage: TokenStorageService, private http: HttpClient
  ) { }

  user: any;
  perms: any;
  adminUrl = "http://localhost:3000/perms_admin";
  operatorUrl = "http://localhost:3000/perms_operator";
  normalUrl = "http://localhost:3000/perms_normal";
  requestUrl = "";

  checkuserRole() {
    this.user = this.tokenStorage.getUser();
    if (this.user.roles.includes("normal")){
      this.requestUrl = this.normalUrl;
    }
    if (this.user.roles.includes("operator")){
      this.requestUrl = this.operatorUrl;
    }
    if (this.user.roles.includes("admin")){
      this.requestUrl = this.adminUrl;
    }
  }

  getAbilityFromJson() {
    this.checkuserRole();
    this.http.get(this.requestUrl).subscribe(data => {
      this.perms = data;
      console.log(this.perms);
      this.updateAbility();
    }, error => {
      if (error.error) {
        console.log("error");
      }
    });
  }

  updateAbility() {
    const { can, rules } = new AbilityBuilder(Ability);

    // Lire doc : https://confluence.uha4point0.fr/display/U4P/Gestion+des+droits+%3A+CASL
    this.perms.forEach((perm: { action: string | string[]; subject: any; }) => {
      can(perm.action, perm.subject)
    });

    this.ability.update(rules);
  }

}