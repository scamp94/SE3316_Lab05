import { Component, OnInit } from '@angular/core';
import {SignUpService} from '../sign-up.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [SignUpService, CookieService]
})

export class SignUpComponent implements OnInit {
  username = '';
  password = '';
  signUpMsg = '';

  constructor(private signUpService: SignUpService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  //send request to create a new user
  createUser(){
    this.signUpService.signUp(this.username, this.password, this.callBackFunction.bind(this));
  }

  //display message received from server
  callBackFunction(res: string){
    console.log(JSON.parse(JSON.stringify(res))._body);
    if(JSON.parse(JSON.stringify(res))._body){
      this.signUpMsg = JSON.parse(JSON.parse(JSON.stringify(res))._body).msg;
    }
  }

  //if sign out clicked update cookie
  signOut(){
    this.cookieService.set('verified', 'false');
  }

}
