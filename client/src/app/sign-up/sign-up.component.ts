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


  constructor(private signUpService: SignUpService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  createUser(){
    this.signUpService.signUp(this.username, this.password, this.callBackFunction.bind(this));
  }

  callBackFunction(res: string){
    console.log(res);
  }

  signOut(){
    this.cookieService.set('verified', 'false');
  }

}
