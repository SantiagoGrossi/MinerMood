import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create (product){
    return this.db.list('/products').push(product);
  }
  getAll(){
    return this.db.list('/products');
  }
  get(productId){
    return this.db.object('/products/' + productId)
  }
  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId){
    debugger;
    return this.db.object('/products/' + productId).remove();
  }
}
