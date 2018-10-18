import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  @Input('hero') hero: any;
  constructor(public httpService: HttpService) { }

  //  hero = {
    // tslint:disable-next-line:max-line-length
    // heroDetailDescription: 'Toting twin pulse pistols, energy-based time bombs, and rapid-fire banter, Tracer is able to "blink" through space and rewind her personal timeline as she battles to right wrongs the world over.',
    // heroName: 'Tracer',
    // design: 'https://d1u5p3l4wpay3k.cloudfront.net/overwatch_gamepedia/8/81/Tracer-portrait.png',
    // link: 'https://playoverwatch.com/en-us/heroes/tracer/',
  // };

  ngOnInit() {
  }

}
