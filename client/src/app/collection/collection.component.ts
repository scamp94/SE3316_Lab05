import {Component, NgModule, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {CollectionService} from '../collection.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [CookieService, CollectionService],
})
export class CollectionComponent implements OnInit {
  errorMsg:String;
  collectionName = '';
  privacy = '';
  verified: Boolean;


  constructor(private cookieService : CookieService, private collectionService: CollectionService) { }

  ngOnInit() {
    this.verified = false;
  }

  showCreateCollection(){
      if(this.cookieService.get('verified') === 'false'){
        this.errorMsg = 'Please login or create an account to create a collection.';
      }else{
        this.verified = true;
      }
  }

  createCollection(){
    this.collectionService.createNewCollection(this.collectionName, this.privacy, this.callBackFunction);
  }

  callBackFunction(){

  }

  signOut(){
    this.cookieService.set('verified', 'false');
    this.verified = false;
  }

}

