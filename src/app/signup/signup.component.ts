import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;

  constructor(public httpService: HttpService) { }

  ngOnInit() {
  }

  signup() {
    this.httpService.signup(this.email, this.password);
    this.email = this.password = '';
  }


}
