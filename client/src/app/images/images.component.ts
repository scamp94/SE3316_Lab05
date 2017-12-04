import { Component, OnInit} from '@angular/core';
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

  //images from search
  images = [];

  verified;

  //user's collections
  collections = [];

  //image user has selected to possibly add to collection
  selectedImage;

  //collection user chooses to add image to
  selectedCollection;

  //message displayed once image has been added to a collection
  AddSuccessMsg = 'Good Choice! The image has been added to your collection.';

  constructor(private imagesService: ImagesService, private cookieService: CookieService) {}

  ngOnInit() {
    //load images from nasa without search parameters
    this.searchImages();

    //if the user is not signed in they cannot see the images
   let check = this.cookieService.get('verified');

   if(check === 'false')
     this.verified = false;
   else
     this.verified = true;

  }

  //search for images given a search criteria
  searchImages() {
    this.imagesService.searchImages(this.searchCriteria, this.onResponse.bind(this));
  }

  //response from search
  onResponse(res : string) {
    //format response into array of links
    this.response  = JSON.parse(JSON.stringify(res));
    this.response = JSON.parse(this.response.body);
    let collection = this.response.collection.items;

    //clear previously loaded images
    this.imagesService.clearImages();

    //add response images to be loaded
    for (let i = 0; i < collection.length; i++ ){
     this.imagesService.loadImages(collection[i].links[0].href);
    }
    this.images = this.imagesService.getImages();
  }

  //if signout is selected, sign the user out
  signOut(){
    this.cookieService.set('verified', 'false');
    this.verified = false;
    window.location.reload();
  }

  //get the collections a user owns. These will then be used to add an image to a selected collection
  getCollections(image){
    console.log(image);
    this.selectedImage = image;
    this.imagesService.getCollections(this.showOptions.bind(this));
  }

  //show the collections the user can add image to
  showOptions(res: JSON[]) {
    for (let i = 0; i < res.length; i++){
        this.collections.push(res[i]);
    }

    document.getElementById('addToCollection').style.display = 'block';
  }

  //send the request to add an image to a collection
  addToCollection(){
    if(this.selectedCollection === undefined)
      return;
    console.log(this.selectedCollection);
    this.imagesService.addImage(this.selectedCollection, this.selectedImage, this.callBackFunction.bind(this));
  }

  //response from added collection to function
  callBackFunction(res : string){
    document.getElementById('addToCollection').style.display = 'none';
    document.getElementById('successAdd').style.display = 'block';
    this.collections = [];

  }

  //close the popup once the user is acknowledges the success
  closeModal(){
    document.getElementById('successAdd').style.display = 'none';
  }

  //close the modal if the user decides not to add the image to a collection
  cancelSelection(){
    document.getElementById('addToCollection').style.display = 'none';
    this.selectedImage = '';
    this.collections = [];
  }

}
