import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Category } from '../models/category';

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

          this.orders = orders;
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

              

           

        })

        
      
  }

  async ngOnInit() {
   
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();

  }
  clearFilters(){
    this.filteredOrders = this.orders.filter(o => o.userId === this.userId);
  }

  filterByCategory(category,event){
    let categoryFounded = this.categories.find(actual=>actual.name==category);
      categoryFounded.checked = !categoryFounded.checked;
      if(event.target.checked == true){
          this.filteredOrders= this.orders.filter( order => order.items.some( items => items.category.includes( category ) ) && order.userId == this.userId);
      }else{
        this.filteredOrders = this.orders.filter(o => o.userId === this.userId);

      }


    }

    filterOrders(category){
      for (let i=0; i<this.categories.length; i++){
        if(this.categories[i].checked){
          this.filteredOrders= this.orders.filter( order => order.userId == this.userId && order.items.some( items => items.category.includes( this.categories[i].categoryname ) ) );

        }
      }
      this.categories.forEach( function(category,index,array) {
       // this.filteredOrders= this.orders.filter( order => order.items.some( items => items.category.includes( category ) ) && order.userId == this.userId);
      })
      

    }

    changeShippedFilter(){
      this.shipped = !this.shipped;
      this.filteredOrders = 
            this.orders.filter(o => o.shipped === this.shipped);
    }

}
