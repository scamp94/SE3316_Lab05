import { Injectable, NgModule } from '@angular/core';
import {Http} from '@angular/http';

@NgModule({
  imports: [
    Http
  ]
})


@Injectable()
export class ImagesService {
  images = [];

  constructor( private http: Http) {
  }
  searchImages(key, callBackFunction) {
     this.http.get('/api/search/'+key)
       .subscribe(response => {
         callBackFunction(response.json())
       });
  }

  loadImages(URL){
      this.images.push(URL)
  }

  getImages(){
    return this.images;
  }

  clearImages(){
    this.images = [];
  }

}
