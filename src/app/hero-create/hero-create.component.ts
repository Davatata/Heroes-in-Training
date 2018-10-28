import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

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

  @ViewChild('abilityArea') heroAbility;
  roles = ['TANK', 'DAMAGE', 'SUPPORT'];
  difficulties = [{value: 1, text: 'Easy'}, {value: 2, text: 'Medium'}, {value: 3, text: 'Hard'}];
  heroRole;
  checkImage = false;
  currentArtwork = '';
  checkArt = false;

  currentHero = <Hero>{
    'design': 'https://d1u5p3l4wpay3k.cloudfront.net/overwatch_gamepedia/8/81/Tracer-portrait.png',
    'role': 'DAMAGE',
    'difficulty': 2,
    'heroDetailDescription': 'Toting twin pulse pistols, energy-based time bombs, and rapid-fire banter.',
    'age': 26,
    'realName': 'Lena Oxton',
    'heroName': 'Tracer',
    'occupation': 'Adventurer',
    'baseOfOperations': 'London, England',
    'affiliation': 'Overwatch (formerly)',
    'heroQuote': '"CHEERS, LOVE! THE CAVALRY’S HERE!"',
    'heroBackstory': 'Lena Oxton (call sign: "Tracer") was the youngest person ever inducted into Overwatch\'s...',
    'abilities': [
      {
        'name': 'PULSE PISTOLS',
        'description': 'Tracer rapid-fires both of her pistols.',
        'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/ability-pulse-pistols/icon-ability.png'
      },
      {
        'name': 'BLINK',
        'description': 'Tracer zips horizontally through space in the direction she’s moving, and reappears...',
        'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/ability-blink/icon-ability.png'
      },
      {
        'name': 'RECALL',
        'description': 'Tracer bounds backward in time, returning her health, ammo and position on the map to...',
        'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/ability-recall/icon-ability.png'
      },
      {
        'name': 'PULSE BOMB',
        'description': 'Tracer lobs a large bomb that adheres to any surface or unfortunate opponent it lands on.',
        'icon': 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/ability-pulse-bomb/icon-ability.png'
      }
    ],
    'art': []
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
    this.currentHero = <Hero>{};
    this.currentAbility = <Ability>{};

    if (this.httpService.hero$ && this.httpService.editMode) {
      this.httpService.hero$.subscribe(res => {
        // console.log('logging hero$');
        // console.table(res);
        if (this.httpService.isCreator()) {
          this.currentHero = res;
        }
      });
    }
  }

  resize(event) {
    if (event.target.value === '') {
      event.target.style.height = '40px';
    } else {
      event.target.style.height = event.target.scrollHeight + 'px';
    }
  }

  trim(event) {
    event.target.innerHtml = event.target.innerHtml.trim();
  }

  addAbility() {
    this.currentAbility.name = this.currentAbility.name.trim().toUpperCase();
    this.currentAbility.description = this.currentAbility.description.trim();
    this.currentAbility.icon = this.currentAbility.icon.trim();

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

  addArtwork() {
    if (!this.currentHero.art) {
      this.currentHero.art = [];
    }
    this.currentHero.art.push(this.currentArtwork);
    this.currentArtwork = '';
  }

  removeArt(index) {
    this.currentHero.art.splice(index, 1);
  }

  editArt(index) {
    this.currentArtwork = this.currentHero.art.splice(index, 1)[0];
    this.checkArt = true;
  }

  updateHero() {
    this.httpService.updateHero({...this.currentHero});
  }

  onSubmit() {

  }
  ngOnDestroy() {

  }
}
