import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatMenuTrigger } from '@angular/material';

import { HttpService } from '../http-service.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  @Input('hero') hero: any;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(public httpService: HttpService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  openCardMenu(heroName, userId, heroId) {
    const user = this.httpService.firebaseAuth.auth.currentUser;
    if (user && user.emailVerified) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '600px',
        data: {'settings': true, 'heroName': heroName }
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed', result); // result undefined or true
        if (result) {
          // console.log('Reason:', result);
          this.httpService.reportHero(heroName, userId, heroId, result);
        } else {
          console.log('canceled');
        }
      });
    } else {
      this.dialog.open(DialogComponent, {
        width: '600px',
        data: {'Unverified': true}
      });
    }
    return false;
  }

  openSettings() {
    console.log('settings');
    event.stopPropagation();
    return false;
  }

  someMethod() {
    this.trigger.openMenu();
  }

  reportHero(heroName, userId, heroId) {
    this.openCardMenu(heroName, userId, heroId);
  }

}
