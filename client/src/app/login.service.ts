import { Injectable, NgModule } from '@angular/core';
import {Http} from '@angular/http';

@NgModule({
  imports: [
    Http
  ]
})

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  verify(email, password, callBackFunction){
    this.http.get('/api/login?email='+email+'&password='+password)
      .subscribe(response => {
        callBackFunction(response.json())
      });
  }
}
