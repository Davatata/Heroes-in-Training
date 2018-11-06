import { Component, OnInit, HostListener, AfterViewInit} from '@angular/core';
import { HttpService } from '../http-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute  } from '@angular/router';
import { Location } from '@angular/common';
import {MatDialog, MatIconRegistry} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit, AfterViewInit {
  heroName = '';
  currentHero;
  bgColor = 'white';
  innerWidth: any;
  userParam;
  heroParam;
  grid = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(public httpService: HttpService,
              public dialog: MatDialog,
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
                ).addSvgIcon(
                  `AFFILIATION`,
                  this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/svgs/affiliation.svg`)
                ).addSvgIcon(
                  `BASE`,
                  this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/svgs/base.svg`)
                ).addSvgIcon(
                  `NAME`,
                  this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/svgs/name.svg`)
                ).addSvgIcon(
                  `OCCUPATION`,
                  this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/svgs/occupation.svg`)
                );
              }

  ngOnInit() {
    this.userParam = this.route.snapshot.paramMap.get('u');
    this.heroParam = this.route.snapshot.paramMap.get('h');
    const localU = localStorage['hit-u'];
    const localH = localStorage['hit-h'];

    if (this.httpService.hero$) {
      console.log('hero not null');
    } else if (this.userParam && this.heroParam) {
      this.httpService.getHero(this.userParam, this.heroParam);
      console.log('getting hero from url params');
    } else if (localU && localH) {
      console.log('getting hero from localstorage');
      this.httpService.getHero(localU, localH);
    }
  }

  ngAfterViewInit() {
    // console.log('Scrolling to top');
    // window.scroll(0, 0);
    // this.innerWidth = window.innerWidth;
  }

  getHero() {
    // this.httpService.getHero(this.heroName);
  }
  addHero() {
    // this.httpService.addHero({});
  }

  editHero() {
    this.httpService.editHero();
  }

  openDialog(url): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1000px',
      data: {'url': url}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        console.log('clicked ok');
      }
    });
  }
}
