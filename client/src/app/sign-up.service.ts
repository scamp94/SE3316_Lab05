import { Injectable, NgModule } from '@angular/core';
import {Http} from '@angular/http';

@NgModule({
  imports: [
    Http
  ]
})

@Injectable()
export class SignUpService {

  constructor(private http: Http) { }

  //send account information to server
  signUp(email: string, password :string, callBackFunction){
    this.http.post('/api/signUp',{
      email: email,
      password: password,
      type: 'register'
    }).subscribe(function(response){
      console.log(response);
      callBackFunction(response);
    })

    }
  }

