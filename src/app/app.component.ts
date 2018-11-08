import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from './http-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Heroes in Training';
  subscription: Subscription;

  constructor(public httpService: HttpService, private router: Router) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.httpService.logout();
    // this.subscription.unsubscribe();
  }

}
