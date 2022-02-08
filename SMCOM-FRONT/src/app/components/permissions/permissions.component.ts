import { Component, OnInit } from '@angular/core';
import { AbilityService } from 'src/app/services/ability.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  perms : any;
  roles : any;
  selectedRole : any;

  constructor( private ability : AbilityService) { }

  async ngOnInit() {
    await this.getRoles();
    await this.getPerms();
    this.selectedRole = null;
  }

  async getPerms(){
    this.perms = await this.ability.user.perms;
  }

  async getRoles(){
    this.roles = await this.ability.getRoleList();
  }

  updateUserRole(){
    this.ability.user.role=this.selectedRole;
    this.ability.updateUser();
    this.ngOnInit();
  }
}
