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
  collectionDescription = '';

  //default privacy setting is private
  privacy = true;
  verified: boolean;
  privVal = '';

  //collection shown for those signed in
  personalCollection = [];

  //public collections for everyone
  publicCollection = [];

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
    this.getPublicCollections();
  }

  getPublicCollections(){
    this.collectionService.getPublicCollection(this.callPublicBackFunction.bind(this));
  }

  callPublicBackFunction(res: JSON[]){
    for (let i = 0; i < res.length; i++){
      this.publicCollection.push(res[i]);
    }
  }




  showCreateCollection(){
      if(this.cookieService.get('verified') === 'false'){
        this.errorMsg = 'Please login or create an account to create a collection.';
      }else{
        document.getElementById('newCollection').style.display = 'block';
      }
  }


  createCollection(){

    //default privacy value is private
    if(this.privVal === 'public')
      this.privacy = false;

    this.collectionService.createNewCollection(this.collectionName, this.privacy, this.collectionDescription);

    //reset privacy value
    this.privacy = true;
    this.closeCreate();
    window.location.reload();
  }

  closeCreate(){
    document.getElementById('newCollection').style.display = 'none';
  }

  signOut(){
    this.cookieService.set('verified', 'false');
    window.location.reload();
    this.verified = false;
  }

  getPersonalCollections(){
    this.collectionService.getPersonalCollection(this.callPersonalBackFunction.bind(this));
  }

  callPersonalBackFunction(res: JSON[]){
    for (let i = 0; i < res.length; i++){
      this.personalCollection.push(res[i]);
    }
  }


  viewCollection(collection){
    this.selectedCollection = collection;
    this.images = collection.image;
    document.getElementById('viewPersonalCollection').style.display = 'block';
  }

  viewPublicCollection(collection){
    this.selectedCollection = collection;
    this.images = collection.image;
    document.getElementById('viewPublicCollection').style.display = 'block';
  }

  viewImg(image){
    this.selectedImg = image;
    document.getElementById('viewPublicImage').style.display = 'block';
  }

  closeImgView(){
    this.selectedImg = '';
    document.getElementById('viewPublicImage').style.display = 'none';
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
    this.noDeleteImg();
    window.location.reload();
  }

  displayEditInfo(pCollection){
    this.selectedCollection = pCollection;
    this.collectionName = pCollection.name;
    this.collectionDescription = pCollection.description;

    if(pCollection.privacy === true){
      this.privVal = 'private';
    }else
      this.privVal = 'public';

    document.getElementById('editCollection').style.display = 'block';
  }

  closeEdit(){
    document.getElementById('editCollection').style.display = 'none';
  }

  editCollection(){
    console.log(this.privVal);

    let privacy = true;

    if(this.privVal === 'public')
      privacy = false;

    this.collectionService.updateInfo(this.collectionName, this.collectionDescription, privacy, this.selectedCollection);
    this.closeEdit();
    window.location.reload();
  }
}

