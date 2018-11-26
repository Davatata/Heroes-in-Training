import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { HttpService } from '../http-service.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public httpService: HttpService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  login() {
    this.httpService.login(this.email, this.password);
    this.email = this.password = '';
  }

  forgotPassword() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {'forgotPassword': true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpService.forgotPassword(result);
      } else {
        console.log('canceled');
      }
    });
  }
}
