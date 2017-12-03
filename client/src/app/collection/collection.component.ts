import {Component, NgModule, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {CollectionService} from '../collection.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [CookieService, CollectionService],
})
export class CollectionComponent implements OnInit {
  errorMsg:String;
  collectionName = '';
  collectionDescription = ''
  privacy = false;
  verified: boolean;
  privVal = '';
  personalCollection = [];

  //images in a selected collection
  images = [];
  selectedCollection;
  selectedImg;

  constructor(private cookieService : CookieService, private collectionService: CollectionService) { }

  ngOnInit() {
    if(this.cookieService.get('verified') === 'false')
      this.verified = false;
    else
      this.verified = true;
    this.getPersonalCollections();
  }

  showCreateCollection(){
      if(this.cookieService.get('verified') === 'false'){
        this.errorMsg = 'Please login or create an account to create a collection.';
      }else{
        document.getElementById('newCollection').style.display = 'block';
      }
  }

  createCollection(){

    if(this.privVal === 'private')
      this.privacy = true;

    this.collectionService.createNewCollection(this.collectionName, this.privacy, this.collectionDescription, this.callBackFunction);

    //reset privacy value
    this.privacy = false;
    document.getElementById('newCollection').style.display = 'none';
  }

  signOut(){
    this.cookieService.set('verified', 'false');
    window.location.reload();
    this.verified = false;
  }

  getPersonalCollections(){
    this.collectionService.getPersonalCollection(this.callBackFunction.bind(this));
  }


  callBackFunction(res: JSON[]){
    for (let i = 0; i < res.length; i++){
      this.personalCollection.push(res[i]);
    }

    console.log(this.personalCollection);
  }

  viewCollection(collection){
    this.selectedCollection = collection;
    this.images = collection.image;
    document.getElementById('viewPersonalCollection').style.display = 'block';
  }

  deleteVerification(collection){
    document.getElementById('deleteCollection').style.display = 'block';
    this.selectedCollection = collection;
  }

  yesDelete(){
    document.getElementById('deleteCollection').style.display = 'none';
    this.collectionService.deleteCollection(this.selectedCollection);
    this.selectedCollection = '';
    window.location.reload();
  }

  noDelete(){
    document.getElementById('deleteCollection').style.display = 'none';
    this.selectedCollection = '';
  }

  removeImgVer(img){
    this.selectedImg = img;
    document.getElementById('deleteImg').style.display = 'block';
  }

  noDeleteImg(){
    document.getElementById('deleteImg').style.display  = 'none';
  }

  yesDeleteImg(){
    this.collectionService.deleteImg( this.selectedImg,this.selectedCollection._id);
    this.selectedImg = '';
    document.getElementById('deleteImg').style.display = 'none';
  }
}

