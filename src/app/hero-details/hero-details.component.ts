import { Component, OnInit, HostListener} from '@angular/core';
import { HttpService } from '../http-service.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute  } from '@angular/router';
import { Location } from '@angular/common';


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
  userParam;
  heroParam;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(public httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private location: Location) {
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
    // console.log('Scrolling to top');
    // window.scrollTo(0, 0);
    // this.innerWidth = window.innerWidth;

    this.userParam = this.route.snapshot.paramMap.get('u');
    this.heroParam = this.route.snapshot.paramMap.get('h');

    if (this.httpService.hero$) {
      console.log('hero not null');
    } else if (this.userParam && this.heroParam) {
      this.httpService.getHero(this.userParam, this.heroParam);
      console.log('getting hero from url params');
    } else if (localStorage['hit-u'] && localStorage['hit-h']) {
      console.log('getting hero from localstorage');
      this.httpService.getHero(localStorage['hit-u'], localStorage['hit-h']);
    }
  }

  getHero() {
    // this.httpService.getHero(this.heroName);
  }
  addHero() {
    // this.httpService.addHero({});
  }

  editHero() {
    this.router.navigate(['/hero-create']);
    console.log('edit hero');
  }
}
