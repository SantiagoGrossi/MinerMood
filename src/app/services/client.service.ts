import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ClientService {

  constructor(private db: AngularFireDatabase) { }

  create(client){
    this.db.list('/clients').push(client);
  }

  getAll(){
    return this.db.list('/clients');
  }
  getClientByUserId(userid){
    console.log("recibido " + userid)
    return this.db.object('/clients/' + userid);
  }

}
