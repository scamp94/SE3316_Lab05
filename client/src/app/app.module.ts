import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import {RoutingModule} from './routing/routing.module';
import { CollectionComponent } from './collection/collection.component';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    LoginComponent,
    SignUpComponent,
    CollectionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})

export class AppModule{}
