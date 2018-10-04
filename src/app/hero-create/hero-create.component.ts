import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})
export class HeroCreateComponent implements OnInit {

  roles = ['TANK', 'DAMAGE', 'SUPPORT'];
  heroRole;
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }
}
