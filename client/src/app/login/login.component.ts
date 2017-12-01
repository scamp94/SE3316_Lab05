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
     if(JSON.parse(JSON.stringify(res)).message){
      this.loginMsg = JSON.parse(JSON.stringify(res)).message;
    }
    else{
      //set cookie expiration to 30 minutes
      let date = new Date();
      date.setTime(date.getTime()+(30*60*1000));

      this.cookieService.set('verified', this.email, 0.1);
      this.loginMsg = 'You are now signed in!'

      this.email = '';
      this.password = '';
    }
  }

  signOut(){
    this.cookieService.set('verified', 'false');
  }
}
