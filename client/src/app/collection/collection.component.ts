import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [CookieService]
})
export class CollectionComponent implements OnInit {

  constructor(private cookieService : CookieService) { }

  ngOnInit() {
  }

  createCollection(){

  }
  signOut(){
    this.cookieService.set('verified', 'false');
  }

}
