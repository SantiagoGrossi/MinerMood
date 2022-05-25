import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;
  constructor(categoryService: CategoryService,private productService: ProductService, private router: Router, private route:ActivatedRoute) { 
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p)
  }

  save(product){
    if(this.id) this.productService.update(this.id,product);

    else this.productService.create(product);
    
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if (!confirm('Are you sure to delete this product?')) return;
    
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);

    
  }

  ngOnInit() {
  }

}
