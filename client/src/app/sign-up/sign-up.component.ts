import { Component, OnInit } from '@angular/core';
import {SignUpService} from '../sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [SignUpService]
})

export class SignUpComponent implements OnInit {
  username = '';
  password = '';


  constructor(private signUpService: SignUpService) { }

  ngOnInit() {
  }

  createUser(){
    this.signUpService.signUp(this.username, this.password, this.callBackFunction);
  }

  callBackFunction(res: string){
    console.log(res);
  }

}
