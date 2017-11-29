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

  signUp(email: string, password :string, callBackFunction){
    fetch('/api/signUp',{
      method: 'post',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({email: email,  password: password, type: 'register'})

    }).then(function(response){
      console.log(response);
      callBackFunction(response['msg']);

    }).catch(function(){
      console.log('error');
    })
    }
  }

