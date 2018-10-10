import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  heroName = '';
  constructor(public httpService: HttpService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
                this.matIconRegistry.addSvgIcon(
                  `SUPPORT`,
                  this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/svgs/support.svg`)
                ).addSvgIcon(
                  `DAMAGE`,
                  this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/svgs/damage.svg`)
                ).addSvgIcon(
                  `TANK`,
                  this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/svgs/tank.svg`)
                );
              }

  ngOnInit() {
  }

  getHero() {
    this.httpService.getHero('', this.heroName);
  }
  addHero() {
    this.httpService.addHero();
  }
}
