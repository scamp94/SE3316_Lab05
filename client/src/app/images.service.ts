import { Injectable, NgModule } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  imports: [
    Http
  ]
})


@Injectable()
export class ImagesService {
  images = [];

  constructor( private http: Http, private cookieService: CookieService) {
  }

  //search images based on a search criteria (key)
  searchImages(key, callBackFunction) {
     this.http.get('/api/search/'+key)
       .subscribe(response => {
         callBackFunction(response.json())
       });
  }

  //loa images given URL
  loadImages(URL){
      this.images.push(URL)
  }

  //return list of images to component
  getImages(){
    return this.images;
  }

  //remove all images from list
  clearImages(){
    this.images = [];
  }

  //get all collections for a user that is signed in
  getCollections(callBackFunction){
    //send owner in header
    let headers = new Headers();
    headers.append('owner', this.cookieService.get('verified'));

    let options = new RequestOptions({ headers: headers});

    this.http.get('/api/collections', options)
      .subscribe(response => {
        callBackFunction(response.json())
      });
  }

  //add image to a collection
  addImage(collectionName, image, callBackFunction){

    //get collection owner from cookie
  let owner = this.cookieService.get('verified');

  //send post request
    fetch('/api/addToCollection',{
      method: 'post',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({name: collectionName, image: image, owner: owner})
    }).then(function(response){
      callBackFunction(response.json());

    }).catch(function(){
      console.log('error');
    })

  }

}
