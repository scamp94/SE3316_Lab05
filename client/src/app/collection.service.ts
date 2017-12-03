import {Injectable, NgModule} from '@angular/core';
import {Headers, Http} from '@angular/http';
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

}
