import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable()
export class EthermineService {
  serviceUrlMiner= "https://api.ethermine.org/miner/"
  constructor(private db: AngularFireDatabase, private http: HttpClient) {
    
   }
   
   
   getMinerStatics(walletAdress:string){
    console.log(walletAdress + 'from service');
    return this.http.get<any>(this.serviceUrlMiner + walletAdress+'/dashboard');
  }
 
  testResponse(){
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts/1');
  }

}
