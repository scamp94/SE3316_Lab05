import {Injectable, NgModule} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';


@Injectable()
export class CollectionService {

  constructor(private http :Http, private cookieService : CookieService ) {}

  //create a new collection given collection information
  createNewCollection(name, privacy, description){
    this.http.post('/api/collections',{
      name: name,  privacy: privacy,description: description,
      owner: this.cookieService.get('verified')
    }).subscribe(function(response) {
      console.log(response);
    });
  }

  //get all collections owned by the user
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

  //get all collections marked as public
  getPublicCollection(callBackFunction){
    this.http.get('/api/PublicCollections')
      .subscribe(response => {
        callBackFunction(response.json())
      });
  }

  //delete one of the user collections
  deleteCollection(collection){
    this.http.delete('/api/editCollection/'+collection._id).subscribe(response =>{
      console.log(response.json());
    })
  }

  //delete an image from the user's collection
  deleteImg(img, collection){
    this.http.delete('/api/collectionDeleteImg?collection='+collection+'&image='+img).subscribe(response=> {
          console.log(response.json());
      })
    }

  //update a collections information
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
