import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';






@Injectable()
export class UsdService {
  serviceDolarUrl= "https://api-dolar-argentina.herokuapp.com/api"
  constructor(private http: HttpClient) { }

  getDolarBlueValue(){
    return this.http.get<any>(this.serviceDolarUrl +'/dolarblue');
  }
}
