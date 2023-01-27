import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Category } from '../models/category';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders$;
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  categories: Category[]=[];
  categoriess:Category[]=[];;
  userId: string;
  userSubscription: Subscription;
  shipped:boolean;
  categoriesTest;
  pressedCategories: any[];


  constructor(private authService: AuthService, private orderService: OrderService) { 
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
    this.shipped = false;
    //this.orders$ = orderService.getOrders()
      //.filter(orders=>  === );

      this.orderService.getOrders()
  
        .subscribe(orders =>{
          this.categories = [];

          this.orders = orders.filter(o => o.userId === this.userId);
          console.log(this.orders)
          this.filteredOrders = 
            this.orders.filter(o => o.userId === this.userId);
            

            this.filteredOrders.forEach((order,index,ordersarray) => {
              order.items.forEach((item,index,itemsarray)=>{

                let category = new Category(item.category,item.quantity,false);
                //category.oquantity++;
                if(this.categories.some(actualcategory => actualcategory.name === category.name)){
                  let categoryFounded = this.categories.find(actual=>actual.name==category.name);
                    if(categoryFounded)
                    categoryFounded.oquantity = categoryFounded.oquantity + 1;
                    categoryFounded.productquantity = categoryFounded.productquantity + item.quantity;
                } else{
                  this.categories.push(category);
                }
                
              })
              }
            );

              

           orders.map(or =>{
             let price = 0;
             let totalItems = 0;
             or.items.forEach(item => {
               price = price + item.totalPrice,
               totalItems = totalItems + item.quantity
             });
             or.totalPriceOrder = price;
             or.totalItemsOrder = totalItems;
           });

        })

        
      
  }

  async ngOnInit() {
   
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();

  }
  cancelOrder(key){
    this.orderService.cancelOrder(key);
  }
  clearFilters(){
    this.filteredOrders = this.orders.filter(o => o.userId === this.userId);
      this.categories.forEach(category => {
      category.checked = false;
      });
  }

  filterByCategory(category,event){
    

    let categoryFounded = this.categories.find(actual=>actual.name==category);
      categoryFounded.checked = !categoryFounded.checked;

      let atLeastOneCategoryChecked = this.categories.some(category => category.checked == true);

      this.filterOrders(atLeastOneCategoryChecked);
  


    }

    filterOrders(atLeastOneCategoryChecked){
     
        this.filteredOrders = this.orders.filter((order) => {
          return order.items.some((item) => {
            let category= this.categories.find(category => category.name == item.category && category.checked == atLeastOneCategoryChecked);
            if(category)  return (item.category === category.name);
            return false;
          });
        });
         
    }

    changeShippedFilter(){
      this.shipped = !this.shipped;
      this.filteredOrders = 
            this.orders.filter(o => o.shipped === this.shipped);
    }

}
