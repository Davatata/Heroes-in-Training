import { Component, OnDestroy } from '@angular/core';
import { HttpService } from './http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Heroes in Training';

  constructor(public httpService: HttpService) {}

  ngOnDestroy() {
    this.httpService.logout();
  }
}
