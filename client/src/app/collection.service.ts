import {Injectable, NgModule} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';


@Injectable()
export class CollectionService {

  errorMsg: String;

  constructor(private http :Http, private cookieService : CookieService ) {

  }

  createNewCollection(name, privacy, description){
    this.http.post('/api/collections',{
      name: name,  privacy: privacy,description: description,
      owner: this.cookieService.get('verified')
    }).subscribe(function(response) {
      console.log(response);
    });
  }

  getPersonalCollection(callBackFunction){
    let headers = new Headers();
    headers.append('owner', this.cookieService.get('verified'));

    console.log(headers);
    let options = new RequestOptions({ headers: headers});

    this.http.get('/api/collections', options)
      .subscribe(response => {
        callBackFunction(response.json())
      });
  }

  getPublicCollection(callBackFunction){
    this.http.get('/api/PublicCollections')
      .subscribe(response => {
        callBackFunction(response.json())
      });
  }

  deleteCollection(collection){
    this.http.delete('/api/editCollection/'+collection._id).subscribe(response =>{
      console.log(response.json());
    })
  }

  deleteImg(img, collection){
    this.http.delete('/api/collectionDeleteImg?collection='+collection+'&image='+img).subscribe(response=> {
          console.log(response.json());
      })
    }

  updateInfo(name, description, privacy, collection){
    this.http.post('/api/editCollection/'+collection._id, {
      name: name,
      description: description,
      privacy: privacy
    }).subscribe(function(response){
      console.log(response);
    })
  }
}
