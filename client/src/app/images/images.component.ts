import { Component, OnInit, NgModule} from '@angular/core';
import {ImagesService} from '../images.service'
import {CookieService} from 'ngx-cookie-service';

declare var angular: any;

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
  providers: [ImagesService, CookieService]
})
export class ImagesComponent implements OnInit {
  searchCriteria = '';
  response;
  images = [];
  verified;
  collections = [];
  selected;

  constructor(private imagesService: ImagesService, private cookieService: CookieService) {

  }

  ngOnInit() {
    this.searchImages();

   let check = this.cookieService.get('verified');

   if(check === 'false')
     this.verified = false;
   else
     this.verified = true;

  }

  searchImages() {
    this.imagesService.searchImages(this.searchCriteria, this.onResponse.bind(this));
  }

  onResponse(res : string) {
    this.response  = JSON.parse(JSON.stringify(res));
    this.response = JSON.parse(this.response.body);
    var collection = this.response.collection.items;

    this.imagesService.clearImages();

    for (var i = 0; i < collection.length; i++ ){
     this.imagesService.loadImages(collection[i].links[0].href);
    }
    this.images = this.imagesService.getImages();
  }

  signOut(){
    this.cookieService.set('verified', 'false');
    this.verified = false;
    window.location.reload();
  }

  getCollections(img){
    this.selected = img;
    this.imagesService.getCollections(this.showOptions);
  }

  showOptions(res: string) {
    console.log(res);
    document.getElementById('addToCollection').style.display = 'block';
  }
}
