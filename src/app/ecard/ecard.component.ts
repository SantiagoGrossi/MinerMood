import { Component,Input, OnInit } from '@angular/core';
import { Card } from '../models/card';

@Component({
  selector: 'ecard',
  templateUrl: './ecard.component.html',
  styleUrls: ['./ecard.component.css']
})
export class EcardComponent implements OnInit {
  @Input('card') card: Card;

  constructor() { }

  ngOnInit() {
  }

}
