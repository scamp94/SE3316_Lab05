import { Injectable, NgModule } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  imports: [
    Http
  ],
  providers: [CookieService]
})

@Injectable()
export class LoginService {
  constructor(private http: Http, private cookieService: CookieService) {}

  //verify email and password
  verify(email, password, callBackFunction) {
    let headers = new Headers();
    headers.append('authentication', this.cookieService.get('verified'));

    let options = new RequestOptions({ headers: headers});

    this.http.get('/api/login?email='+email+'&password='+password, options)
      .subscribe(response => {
        callBackFunction(response.json())
      });
  }
}
