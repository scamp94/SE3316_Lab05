import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  cookieValue = 'UNKNOWN';

  constructor(private cookieService: CookieService){}

  ngOnInit(){
    this.cookieService.set('verified', 'false');
    this.cookieValue = this.cookieService.get('verified');
  }

}
