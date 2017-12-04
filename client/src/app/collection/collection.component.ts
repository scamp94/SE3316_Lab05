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
  //error message
  errorMsg:String;


  collectionName = '';
  collectionDescription = '';

  //default privacy setting is private
  //privacy is passed to server when editing/creating a collection
  privacy = true;
  //privVal is the value selected from a drop-down menu  (privacy value: Public = false, Private = true)
  privVal = '';

  //verified is if the user is signed in => used for hidden sections in html
  verified: boolean;


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

    //check if user is signed in
    if(this.cookieService.get('verified') === 'false')
      this.verified = false;
    else
      this.verified = true;

    //load all person collections
    this.getPersonalCollections();

    //load all public collections
    this.getPublicCollections();
  }

  //get collections that are public
  getPublicCollections(){
    this.collectionService.getPublicCollection(this.callPublicBackFunction.bind(this));
  }

  //close collection that has been selected to browse
  closePublicCollection(){
    document.getElementById('viewPublicCollection').style.display = 'none';
  }

  //close private collection that has been selected to browse
  closePrivateCollection(){
    document.getElementById('viewPersonalCollection').style.display = 'none';
  }

  //handle response from server to load public collections
  callPublicBackFunction(res: JSON[]){
    for (let i = 0; i < res.length; i++){
      this.publicCollection.push(res[i]);
    }
  }

  //show the createCollection form when button clicked
  showCreateCollection(){
      if(this.cookieService.get('verified') === 'false'){
        this.errorMsg = 'Please login or create an account to create a collection.';
      }else{
        document.getElementById('newCollection').style.display = 'block';
      }
  }

  //send information to create collection
  createCollection(){
    //default privacy value is private
    if(this.privVal === 'public')
      this.privacy = false;

    this.collectionService.createNewCollection(this.collectionName, this.privacy, this.collectionDescription);

    //reset privacy value to default to true
    this.privacy = true;

    //close the create collection form
    this.closeCreate();

    //update collection lists
    window.location.reload();
  }

  //close the create collection form
  closeCreate(){
    document.getElementById('newCollection').style.display = 'none';
  }

  //if user signs out update what is views on page
  signOut(){
    this.cookieService.set('verified', 'false');
    window.location.reload();
    this.verified = false;
  }

  //get all collections for user
  getPersonalCollections(){
    this.collectionService.getPersonalCollection(this.callPersonalBackFunction.bind(this));
  }

  //display personal collection returned from server
  callPersonalBackFunction(res: JSON[]){
    for (let i = 0; i < res.length; i++){
      this.personalCollection.push(res[i]);
    }
  }

  //view a personal collection when selected
  viewCollection(collection){
    this.selectedCollection = collection;
    this.images = collection.image;
    document.getElementById('viewPersonalCollection').style.display = 'block';
  }

  //view a public collection when selected
  viewPublicCollection(collection){
    this.selectedCollection = collection;
    this.images = collection.image;
    document.getElementById('viewPublicCollection').style.display = 'block';
  }

  //view an image in full when selected in public view
  viewImg(image){
    this.selectedImg = image;
    document.getElementById('viewPublicImage').style.display = 'block';
  }

  //close the image viewer when done looking at the image
  closeImgView(){
    this.selectedImg = '';
    document.getElementById('viewPublicImage').style.display = 'none';
  }

  //confirm the user wants to delete one of their collections
  deleteVerification(collection){
    document.getElementById('deleteCollection').style.display = 'block';
    this.selectedCollection = collection;
  }

  //send the request to delete a selected collection
  yesDelete(){
    document.getElementById('deleteCollection').style.display = 'none';
    this.collectionService.deleteCollection(this.selectedCollection);
    this.selectedCollection = '';
    window.location.reload();
  }

  //close the delete verification window and do not delete the collection
  noDelete(){
    document.getElementById('deleteCollection').style.display = 'none';
    this.selectedCollection = '';
  }

  //varify user wants to remove an image from a collection
  removeImgVer(img){
    this.selectedImg = img;
    document.getElementById('deleteImg').style.display = 'block';
  }

  //do not delete the image and close the window
  noDeleteImg(){
    document.getElementById('deleteImg').style.display  = 'none';
  }

  //delete the selected image form the user's collection
  yesDeleteImg(){
    this.collectionService.deleteImg( this.selectedImg,this.selectedCollection._id);
    this.selectedImg = '';
    this.noDeleteImg();
    window.location.reload();
  }

  //display editable information about a owned collection
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

  //close the edit window without saving changes
  closeEdit(){
    document.getElementById('editCollection').style.display = 'none';
  }

  //save changes to collection then close window
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

