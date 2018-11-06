import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from './http-service.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Heroes in Training';

  constructor(public httpService: HttpService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
    });
}

  ngOnDestroy() {
    this.httpService.logout();
  }

}
