import { Component, OnInit } from '@angular/core';
import { AbilityService } from 'src/app/services/ability.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  perms : any;

  constructor( private ability : AbilityService) { }

  ngOnInit(): void {
    this.getPerms();
  }

  async getPerms(){
    this.perms = await this.ability.getAbilityFromJson();
  }

}
