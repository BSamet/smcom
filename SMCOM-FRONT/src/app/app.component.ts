import { Component } from '@angular/core';
import { Ability, AbilityBuilder } from '@casl/ability';
import { AbilityService } from 'src/app/services/ability.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SMCOM';

  constructor(
    private ability: Ability,
    private abilityService: AbilityService
  ) { }

  ngOnInit(): void {
    this.abilityService.getAbilityFromJson();
  }

}
