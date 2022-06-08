import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Category } from '../models/category';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit,OnDestroy {
  orders$;
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  categories: Category[]=[];
  categoriess:Category[]=[];;
  userId: string;
  userSubscription: Subscription;
  shipped:boolean;
  categoriesTest;

  constructor( private authService: AuthService, private orderService: OrderService) { 
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
    this.shipped = false;
    //this.orders$ = orderService.getOrders()
      //.filter(orders=>  === );

      this.orderService.getOrders()
  
        .subscribe(orders =>{
          this.categories = [];
          this.orders = orders;

          this.filteredOrders = orders;

            

            this.filteredOrders.forEach((order,index,ordersarray) => {
              order.items.forEach((item,index,itemsarray)=>{

                let category = new Category(item.category,item.quantity);

                if(this.categories.some(actualcategory => actualcategory.name === category.name)){
                  let categoryFounded = this.categories.find(actual=>actual.name==category.name);
                    if(categoryFounded)
                    categoryFounded.productquantity = categoryFounded.productquantity + item.quantity;
                } else{
                  this.categories.push(category);
                }
                
              })
              }
            );

        })
  
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();

  }
  sendOrder(key){
    this.orderService.sendOrder(key);
  }

  changeShippedFilter(){
    this.shipped = !this.shipped;
    this.filteredOrders = 
          this.orders.filter(o => o.shipped === this.shipped);
  }

}
