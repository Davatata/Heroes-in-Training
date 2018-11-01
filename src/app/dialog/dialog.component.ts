import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @ViewChild('slide') slideshow: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
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

}
