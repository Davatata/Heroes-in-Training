import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { HttpService } from '../http-service.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  @Input('hero') hero: any;
  constructor(public httpService: HttpService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  openCardMenu(heroName, userId, heroId) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {'settings': true, 'heroName': heroName }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result); // result undefined or true
      if (result) {
        console.log('clicked ok');
      } else {
        console.log('canceled');
      }
    });
    return false;
  }

  openSettings(heroName, userId, heroId) {
    console.log('settings');
    event.stopImmediatePropagation();
    this.openCardMenu(heroName, userId, heroId);
    return false;
  }

}
