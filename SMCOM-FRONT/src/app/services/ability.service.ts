import { Injectable } from '@angular/core';
import { Ability, AbilityBuilder } from '@casl/ability';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {

  constructor(private ability: Ability, private tokenStorage: TokenStorageService
  ) { }

  user: any;

  updateAbility() {
    const { can, rules } = new AbilityBuilder(Ability);

    this.user = this.tokenStorage.getUser();

    // Lire doc : https://confluence.uha4point0.fr/display/U4P/Gestion+des+droits+%3A+CASL
    if (this.user.roles.includes('admin')) {
      can('manage', 'all');
    }

    if (this.user.roles.includes('operator')) {
      can('see', 'Kpi');
    }

    this.ability.update(rules);

    return this.ability;
  }

}
