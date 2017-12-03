import {Injectable, NgModule} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';


@Injectable()
export class CollectionService {

  errorMsg: String;

  constructor(private http :Http, private cookieService : CookieService ) {

  }

  createNewCollection(name, privacy, description, callBackFunction){
    fetch('/api/createCollection',{
      method: 'post',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({name: name,  privacy: privacy,description: description, owner: this.cookieService.get('verified')})

    }).then(function(response){
      console.log(response);
      callBackFunction(response.json());

    }).catch(function(){
      console.log('error');
    })
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

  deleteCollection(collection){
    this.http.delete('/api/collection/'+collection._id).subscribe(response =>{
      console.log(response.json());
    })
  }

  deleteImg(img, collection){
    this.http.delete('/api/collectionDeleteImg?collection='+collection+'&image='+img).subscribe(response=> {
          console.log(response.json());
      })
    }



}
