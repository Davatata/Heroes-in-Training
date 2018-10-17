import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import { Hero } from '../models/hero.model';
import { Ability } from '../models/ability.model';
import { HttpService } from '../http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})
export class HeroCreateComponent implements OnInit, OnDestroy {

  roles = ['TANK', 'DAMAGE', 'SUPPORT'];
  difficulties = [{value: 1, text: 'Easy'}, {value: 2, text: 'Medium'}, {value: 3, text: 'Hard'}];
  heroRole;
  // currentHero = <Hero>{
  //   abilities: [
  //     {
  //       'name': 'PULSE PISTOLS',
  //       'description': 'Tracer rapid-fires both of her pistols.',
  //       'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/ability-pulse-pistols/icon-ability.png'
  //     },
  //     {
  //       'name': 'BLINK',
  //       'description': 'Tracer zips horizontally through space in the direction she’s moving...',
  //       'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/ability-blink/icon-ability.png'
  //     },
  //     {
  //       'name': 'RECALL',
  //       'description': 'Tracer bounds backward in time, returning her health, ammo and position...',
  //       'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/ability-recall/icon-ability.png'
  //     },
  //     {
  //       'name': 'PULSE BOMB',
  //       'description': 'Tracer lobs a large bomb that adheres to any surface or unfortunate opponent...',
  //       'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/ability-pulse-bomb/icon-ability.png'
  //     }
  //   ]
  // };

  currentHero = <Hero>{
    abilities :  [
      {
        'name': 'SHURIKEN',
        // tslint:disable-next-line:max-line-length
        'description': 'Genji looses three deadly throwing stars in quick succession. Alternatively, he can throw three shuriken in a wider spread.',
        'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/genji/ability-shuriken/icon-ability.png'
      },
      {
        'name': 'DEFLECT',
        // tslint:disable-next-line:max-line-length
        'description': 'With lightning-quick swipes of his sword, Genji reflects an oncoming projectile and sends it rebounding towards his opponent.',
        'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/genji/ability-deflect/icon-ability.png'
      },
      {
        'name': 'SWIFT STRIKE',
        // tslint:disable-next-line:max-line-length
        'description': 'Genji darts forward, slashing with his katana and passing through foes in his path. If Genji eliminates a target, he can instantly use this ability again.',
        'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/genji/ability-swift-strike/icon-ability.png'
      },
      {
        'name': 'DRAGONBLADE',
        // tslint:disable-next-line:max-line-length
        'description': 'Genji brandishes his katana for a brief period of time. Until he sheathes his sword, Genji can deliver killing strikes to any targets within his reach.',
        'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/genji/ability-dragonblade/icon-ability.png'
      }
    ]
  };

  currentAbility = {
    name: 'PULSE BOMB',
    icon: 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/ability-pulse-bomb/icon-ability.png',
    // tslint:disable-next-line:max-line-length
    description: 'Tracer lobs a large bomb that adheres to any surface or unfortunate opponent it lands on. After a brief delay, the bomb explodes, dealing high damage to all enemies within its blast radius.'
  };
  defaultAbilityURL = 'https://d1u1mce87gyfbn.cloudfront.net/hero/mccree/ability-flashbang/icon-ability.png';

  // @ViewChild('description') description: ElementRef;

  constructor(public httpService: HttpService,
              private router: Router) {}

  ngOnInit() {
    // if (this.httpService.unsavedHero !== null) {
    //   this.currentHero = this.httpService.unsavedHero;
    // }
  }

  resize(event) {
    if (event.target.value === '') {
      event.target.style.height = '40px';
    } else {
      event.target.style.height = event.target.scrollHeight + 'px';
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

  removeCard(index: number) {
    this.currentHero.abilities.splice(index, 1);
  }

  editCard(index: number) {
    this.currentAbility = this.currentHero.abilities.splice(index, 1)[0];
  }

  badImage(event) {
    // event.target.src = `../../assets/imgs/defaultIcon.png`;
  }

  saveHero() {
    this.httpService.addHero({...this.currentHero});
    this.router.navigate(['/hero-details']);
  }

  onSubmit() {

  }
  ngOnDestroy() {

  }
}
