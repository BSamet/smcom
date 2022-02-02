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
  roles: any;
  rolesUrl = "http://localhost:3000/roles";

  async getUserPerms() {
    this.user = this.tokenStorage.getUser();
    this.roles = await this.http.get(this.rolesUrl).toPromise();
    console.log("log Roles");
    console.log(this.roles);

    await this.roles.forEach((role: { nom: any; perms: any; }) => {

      if (role.nom == this.user.role) {
        this.user.perms = role.perms;

        console.log("log User");
        console.log(this.user);
      }
    });
  }

  async updateAbility() {
    await this.getUserPerms();
    const { can, rules } = new AbilityBuilder(Ability);

    // Lire doc : https://confluence.uha4point0.fr/display/U4P/Gestion+des+droits+%3A+CASL
    this.user.perms.forEach((perm: { action: string | string[]; subject: any; }) => {
      can(perm.action, perm.subject)
    });

    this.ability.update(rules);
  }

  async getRoleList() {
    let roleList = await this.http.get(this.rolesUrl).toPromise();
    return roleList;
  }

  updateUser(){
    this.user.perms = null;
    this.tokenStorage.saveUser(this.user);
    this.updateAbility();
  }
}