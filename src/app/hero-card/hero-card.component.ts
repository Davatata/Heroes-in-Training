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

  ngOnInit() {
  }

}
