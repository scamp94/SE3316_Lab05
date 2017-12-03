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
  collectionDescription = ''
  privacy = false;
  verified: boolean;
  privVal = '';

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

    if(this.privVal === 'private')
      this.privacy = true;

    this.collectionService.createNewCollection(this.collectionName, this.privacy, this.collectionDescription, this.callBackFunction);

    //reset privacy value
    this.privacy = false;
  }

  callBackFunction(res: string){

  }

  signOut(){
    this.cookieService.set('verified', 'false');
    window.location.reload();
    this.verified = false;
  }

}

