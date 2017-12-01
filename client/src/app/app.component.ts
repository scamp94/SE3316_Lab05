import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: "<router-outlet></router-outlet>",
  providers: [CookieService]
})
export class AppComponent implements OnInit {
  cookieValue = 'UNKNOWN';

  constructor(private cookieService: CookieService){}

  ngOnInit(){
    //this.cookieService.set('verified', 'false', 15);
    //this.cookieValue = this.cookieService.get('verified');
  }

  signOut(){
    this.cookieService.set('verified', 'false');
  }

}
