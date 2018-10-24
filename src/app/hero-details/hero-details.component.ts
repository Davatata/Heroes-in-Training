import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from '../http-service.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  heroName = '';
  currentHero;
  bgColor = 'white';
  innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(public httpService: HttpService,
              private router: Router,
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
    console.log('Scrolling to top');
    window.scrollTo(0, 0);
    this.innerWidth = window.innerWidth;
  }

  getHero() {
    this.httpService.getHero(this.heroName);
  }
  addHero() {
    // this.httpService.addHero({});
  }

  editHero() {
    this.router.navigate(['/hero-create']);
    console.log('edit hero');
  }
}
