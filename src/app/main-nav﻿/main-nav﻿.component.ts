import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {MatDialog, MatIconRegistry} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

import { HttpService } from '../http-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-nav﻿',
  templateUrl: './main-nav﻿.component.html',
  styleUrls: ['./main-nav﻿.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public httpService: HttpService,
              public dialog: MatDialog,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
                this.matIconRegistry.addSvgIcon(`ow`,
                  this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/svgs/ow.svg`));
              }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.httpService.logout();
      }
    });
  }

}
