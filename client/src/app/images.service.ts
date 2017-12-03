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

  getCollections(callBackFunction){
    let headers = new Headers();
    headers.append('authentication', this.cookieService.get('verified'));

    let options = new RequestOptions({ headers: headers});

    this.http.get('/api/collections', options)
      .subscribe(response => {
        callBackFunction(response.json())
      });
  }

}
