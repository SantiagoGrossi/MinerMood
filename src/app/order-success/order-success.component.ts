import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  id;
  order;
  constructor(private router: Router, private route:ActivatedRoute, private orderService:OrderService) { 
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)  this.orderService.getOrder(this.id).subscribe(order => this.order = order);
  }

  async ngOnInit() {
    

  
  }

}
