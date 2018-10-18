import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-hero-gallery',
  templateUrl: './hero-gallery.component.html',
  styleUrls: ['./hero-gallery.component.css']
})
export class HeroGalleryComponent implements OnInit {

  constructor(public httpService: HttpService) { }

  ngOnInit() {
  }

}
