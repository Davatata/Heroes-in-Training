import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';

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

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }
}
