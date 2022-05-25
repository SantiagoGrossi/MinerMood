import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
appUser: AppUser;
cart$: Observable<ShoppingCart>;
  

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
   
   }

 logout(){
  this.auth.logout();
 }

 async ngOnInit() {
  this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

  this.cart$ =await this.shoppingCartService.getCart();
  
 }

}
