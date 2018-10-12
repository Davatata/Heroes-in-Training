import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Hero } from '../models/hero.model';
import { Ability } from '../models/ability.model';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})
export class HeroCreateComponent implements OnInit {

  roles = ['TANK', 'DAMAGE', 'SUPPORT'];
  difficulties = [{value: 1, text: 'Easy'}, {value: 2, text: 'Medium'}, {value: 3, text: 'Hard'}];
  heroRole;
  currentHero = <Hero>{};
  currentAbility = {
    name: 'PULSE BOMB',
    icon: 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/ability-pulse-bomb/icon-ability.png',
    // tslint:disable-next-line:max-line-length
    description: 'Tracer lobs a large bomb that adheres to any surface or unfortunate opponent it lands on. After a brief delay, the bomb explodes, dealing high damage to all enemies within its blast radius.'
  };
  defaultAbilityURL = 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/ability-pulse-pistols/icon-ability.png';

  @ViewChild('description') description: ElementRef;

  constructor(public httpService: HttpService) {}

  ngOnInit() {
  }

  resize() {
    if (!this.currentHero.heroDetailDescription) {
      this.description.nativeElement.style.height = '40px';
    } else {
      this.description.nativeElement.style.height = this.description.nativeElement.scrollHeight + 'px';
    }
  }

  addAbility() {
    this.currentAbility.name = this.currentAbility.name.toUpperCase();
    if (!this.currentHero.abilities) {
      this.currentHero.abilities = [{...this.currentAbility}];
    } else {
      this.currentHero.abilities.push({...this.currentAbility});
    }
    this.currentAbility.name = '';
    this.currentAbility.icon = '';
    this.currentAbility.description = '';
  }

  onSubmit() {

  }
}
