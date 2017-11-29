import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ImagesComponent} from '../images/images.component';
import {LoginComponent} from '../login/login.component';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {CollectionComponent} from '../collection/collection.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'search'},
  {path: 'search', component: ImagesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'collections', component: CollectionComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: true}
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }

export const routingComponents = [ImagesComponent, LoginComponent, SignUpComponent];
