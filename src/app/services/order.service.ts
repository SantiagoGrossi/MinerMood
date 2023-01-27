import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {
  
  constructor(private db:AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(){
    return this.db.list('/orders');
  }

  getOrder(orderId:string){
    return this.db.object('/orders/' + orderId );
  }

  sendOrder(key){
    let order$ = this.getOrder(key);
    order$.take(1).subscribe(order=>{
      console.log(order)
      order$.update({
          shipped: true
        });
  
    });


  }

  cancelOrder(key){
    let order$ = this.getOrder(key);
    order$.take(1).subscribe(order=>{
      order$.remove();
  
    });


  }


}
