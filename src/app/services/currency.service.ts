import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CurrencyService {

  constructor(private db:AngularFireDatabase) { }

  getcurrencies (){
    return this.db.list('/currencies',{
      query: {
        orderByChild:'name'
      }
    });
  }

}
