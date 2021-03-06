import { Component,
          OnInit,
          OnDestroy,
          ViewChild,
          ElementRef,
          AfterViewInit,
          HostListener } from '@angular/core';
 import { NgForm } from '@angular/forms';

import { Hero } from '../models/hero.model';
import { Ability } from '../models/ability.model';
import { HttpService } from '../http-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})
export class HeroCreateComponent implements OnInit, OnDestroy, AfterViewInit {

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  // @ViewChild('abilityArea') heroAbility;

  roles = ['TANK', 'DAMAGE', 'SUPPORT'];
  difficulties = [{value: 1, text: 'Easy'}, {value: 2, text: 'Medium'}, {value: 3, text: 'Hard'}];
  checkImage = false;
  currentArtwork = '';
  checkArt = false;
  changeMade = false;

  currentHero = <Hero>{};
  currentAbility = <Ability>{};
  // defaultAbilityURL = 'https://d1u1mce87gyfbn.cloudfront.net/hero/mccree/ability-flashbang/icon-ability.png';

  @ViewChild('description') description: ElementRef;
  @ViewChild('backstory') backstory: ElementRef;
  @ViewChild('heroForm') heroForm: NgForm;

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    this.storeHero();
  }

  constructor(public httpService: HttpService,
              public dialog: MatDialog,
              private router: Router) {}

  ngOnInit() {
    this.clearCurrentHero();
    this.currentAbility = <Ability>{
      'name': '',
      'description': '',
      'icon': ''
    };

    if (this.httpService.unsavedHero) {
      this.currentHero = {...this.httpService.unsavedHero};
      this.changeMade = true;
      console.table(this.currentHero);
    } else if (localStorage['unsavedHero']) {
      this.currentHero = <Hero>JSON.parse(localStorage['unsavedHero']);
      this.changeMade = true;
    } else {
      this.clearCurrentHero();
    }

    // this.httpService.clearUnsavedHero();

    if (this.httpService.hero$ && this.httpService.editMode) {
      this.httpService.hero$.subscribe(res => {
        if (this.httpService.isCreator()) {
          this.currentHero = res;
        }
      });
    }
  }

  ngAfterViewInit() {
    this.description.nativeElement.style.height =
    this.description.nativeElement.style.scrollHeight + 'px';
    this.backstory.nativeElement.style.height =
    this.backstory.nativeElement.style.scrollHeight + 'px';
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
    this.changeMadeIfEdit();
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
    this.changeMadeIfEdit();
    this.currentHero.abilities.splice(index, 1);
  }

  editCard(index: number) {
    this.currentAbility = this.currentHero.abilities.splice(index, 1)[0];
  }

  badImage(event) {
    // event.target.src = `../../assets/imgs/defaultIcon.png`;
  }

  saveHero() {
    this.cleanUpText();
    this.httpService.addHero({...this.currentHero});
    this.httpService.clearUnsavedHero();
    this.changeMade = false;
    this.router.navigate(['/hero-details']);
  }

  addArtwork() {
    this.changeMadeIfEdit();
    if (!this.currentHero.art) {
      this.currentHero.art = [];
    }
    this.currentHero.art.push(this.currentArtwork.trim());
    this.currentArtwork = '';
  }

  removeArt(index) {
    this.changeMadeIfEdit();
    this.currentHero.art.splice(index, 1);
  }

  editArt(index) {
    this.currentArtwork = this.currentHero.art.splice(index, 1)[0];
    this.checkArt = true;
  }

  updateHero() {
    this.cleanUpText();
    this.httpService.clearUnsavedHero();
    this.changeMade = false;
    this.httpService.updateHero({...this.currentHero});
  }

  changeMadeIfEdit() {
    if (this.httpService.editMode) {
      this.changeMade = true;
    }
  }

  moveAbilityUp(i) {
    const newPos = (i === 0 ? this.currentHero.abilities.length - 1 : i - 1);
    this.moveHeroAbility(i, newPos);
  }

  moveAbilityDown(i) {
    const newPos = (i === this.currentHero.abilities.length - 1 ? 0 : i + 1);
    this.moveHeroAbility(i, newPos);
  }

  moveHeroAbility(i, newPos) {
    const ability = this.currentHero.abilities.splice(i, 1);
    this.currentHero.abilities.splice(newPos, 0, ability[0]);
    this.changeMade = true;
  }

  cleanUpText() {
    const hero = this.currentHero;
    hero.design = hero.design.trim();
    hero.heroDetailDescription = hero.heroDetailDescription.trim();
    hero.realName = hero.realName.trim();
    hero.heroName = hero.heroName.trim();
    hero.occupation = hero.occupation.trim();
    hero.baseOfOperations = hero.baseOfOperations.trim();
    hero.affiliation = hero.affiliation.trim();
    hero.heroQuote = hero.heroQuote.trim().replace(/\"/g, '');
    console.log('new quote', hero.heroQuote);
    hero.heroBackstory = hero.heroBackstory.trim();
  }

  storeHero() {
    this.httpService.unsavedHero = {...this.currentHero};
    localStorage['unsavedHero'] = JSON.stringify(this.currentHero);
  }

  clearForm() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {'reset': true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Clearing form', result);
        this.clearCurrentHero();
        this.httpService.clearUnsavedHero();
        this.heroForm.reset();
        this.changeMade = false;
      }
    });
  }

  clearCurrentHero() {
    this.currentHero = <Hero>{};
  }

  ngOnDestroy() {
    if (this.changeMade) {
      console.log('saving hero in storage');
      this.storeHero();
    }
    this.httpService.editMode = false;
  }
}
