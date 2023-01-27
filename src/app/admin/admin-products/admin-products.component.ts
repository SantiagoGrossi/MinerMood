import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableResource } from 'angular-4-data-table';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  tableResource: DataTableResource<Product>;
  subscription : Subscription;
  filteredProducts: any[];
  products: Product[];
  items: Product[];
  itemCount: number;
  products$;

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll()
      .subscribe(products =>{
        this.filteredProducts = this.products = products;
        this.initializeTable(products);
        console.log(products);
      })
  }

  ngOnInit() {
  }
  private initializeTable( products: Product[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset: 0})
      .then(items => this.items = items)
    this.tableResource.count()
      .then(count => this.itemCount = count)
  }

  reloadItems(params){
     if (!this.tableResource) return;

     this.tableResource.query(params) .then(items => this.items = items);
  }

  filter (query : string){
     this.filteredProducts = (query) ?
      this.products.filter(c=> c.title.toLowerCase().includes(query.toLowerCase())):
      this.products;

      this.initializeTable(this.filteredProducts);
  }


}
