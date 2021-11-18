import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
card={
  facebook: "facebook.com/"
};
  constructor(  private router: Router,
    private route: ActivatedRoute,
    private productService:ProductService) { }

  ngOnInit() {
  }

  save(card){

    
    this.productService.create(card);
    this.router.navigate(['/myCards']);
    
  }

}
