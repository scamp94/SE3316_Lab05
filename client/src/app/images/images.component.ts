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
  selectedImage;
  selectedCollection;
  AddSuccessMsg = 'Good Choice! The image has been added to your collection.';

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
    let collection = this.response.collection.items;

    this.imagesService.clearImages();

    for (let i = 0; i < collection.length; i++ ){
     this.imagesService.loadImages(collection[i].links[0].href);
    }
    this.images = this.imagesService.getImages();
  }

  signOut(){
    this.cookieService.set('verified', 'false');
    this.verified = false;
    window.location.reload();
  }

  getCollections(image){
    console.log(image);
    this.selectedImage = image;
    this.imagesService.getCollections(this.showOptions.bind(this));
  }

  showOptions(res: JSON[]) {
    for (let i = 0; i < res.length; i++){
        this.collections.push(res[i]);
    }

    document.getElementById('addToCollection').style.display = 'block';
  }

  addToCollection(){
    if(this.selectedCollection === undefined)
      return;
    console.log(this.selectedCollection);
    this.imagesService.addImage(this.selectedCollection, this.selectedImage, this.callBackFunction.bind(this));
  }

  callBackFunction(res : string){
    document.getElementById('addToCollection').style.display = 'none';
    document.getElementById('successAdd').style.display = 'block';
    this.collections = [];

  }

  closeModal(){
    document.getElementById('successAdd').style.display = 'none';
  }

}
