import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products: Product[] = [];
  category:string;
  filteredProducts: Product[] = [];
  cart: any;
  subscription: Subscription;
  constructor(private router: Router, route:ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService) { 

    
    this.productService.getAll().switchMap(products => {
      this.products = products;
      return route.queryParamMap})

      .subscribe(params =>{
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) : this.products;
      });


    
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
    .subscribe(cart => this.cart = cart)

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
