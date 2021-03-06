import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  constructor(private shoppingCartService: ShoppingCartService) { }

  AddToCart(){
    this.shoppingCartService.addToCart(this.product);
  }

 

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product);
  }
 

}
