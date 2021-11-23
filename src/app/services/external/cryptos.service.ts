import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class CryptosService {
  serviceEthUrl= "https://api.coinbase.com/v2/prices/ETH-USD"

  constructor(private http: HttpClient) { }

  getEthereumValue(){
    return this.http.get<any>(this.serviceEthUrl + '/buy');
  }
}
