import { Component, OnInit, NgModule} from '@angular/core';
import {ImagesService} from '../images.service'
declare var angular: any;

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
  providers: [ImagesService]
})
export class ImagesComponent implements OnInit {
  searchCriteria = '';
  response;
  images = [];

  constructor(private imagesService: ImagesService) {

  }

  ngOnInit() {
    this.searchImages();
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
}
