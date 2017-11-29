import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, CookieService]
})
export class LoginComponent implements OnInit {
  email:'';
  password: '';
  loginMsg: String;


  constructor(private loginService: LoginService, private cookieService: CookieService) { }

  ngOnInit() {
    this.loginMsg = ' ';
  }

  login(){
    this.loginService.verify(this.email, this.password, this.callBackFunction.bind(this));
  }

  callBackFunction(res : string){
    if(res == ''){
      this.loginMsg = "Incorrect username or password, please try again";
    }else if(JSON.parse(JSON.stringify(res)).message){
      this.loginMsg = JSON.parse(JSON.stringify(res)).message;
    }
    else{
      this.cookieService.set('verified', this.email);
      this.loginMsg = 'You are now logged in!'
    }
  }
}
