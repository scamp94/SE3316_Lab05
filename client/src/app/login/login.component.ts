import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  email:'';
  password: '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login(){
    this.loginService.verify(this.email, this.password, this.callBackFunction);
  }

  callBackFunction(res : string){
    console.log(res);
  }
}
