import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @ViewChild('slide') slideshow: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data) {
      console.log(this.data);
      // this.slideshow.goToSlide(this.data.index);
      // this.slideshow.goToSlide(3);
    }
  }

  showReported(reportText) {
    // console.log('send report');
    this.snackBar.open('Report Sent', '', {
      duration: 4000
    });
    this.dialogRef.close(reportText);
  }

  close() {
    this.dialogRef.close();
  }

  changePassword(email) {
    this.snackBar.open('Email sent', '', {
      duration: 4000
    });
    this.dialogRef.close(email);
  }

  deleteHero(heroName) {
    this.dialogRef.close(heroName);
  }
}
