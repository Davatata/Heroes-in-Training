import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public httpService: HttpService) { }

  ngOnInit() {
  }

  login() {
    this.httpService.login(this.email, this.password);
    this.email = this.password = '';
  }
}
