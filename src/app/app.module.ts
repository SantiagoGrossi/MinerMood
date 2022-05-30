import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFireDatabaseModule } from 'angularfire2/database'; 
import { AngularFireAuthModule } from 'angularfire2/auth'; 
import { RouterModule } from '@angular/router'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import {CustomFormsModule} from 'ng2-validation';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard as AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuard} from './admin-auth-guard.service';
import {FormsModule} from '@angular/forms';
import {DataTableModule} from'angular-4-data-table';
import { HttpModule } from '@angular/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientFormComponent } from './admin/client-form/client-form.component';
import { ClientsComponent } from './clients/clients.component';
import { CurrencyService } from './services/currency.service';
import { ClientService } from './services/client.service';
import { WalletAdressComponent } from './wallet-adress/wallet-adress.component';
import { EthermineService } from './ethermine.service';
import { HttpClientModule } from '@angular/common/http';
import { UsdService } from './services/external/usd.service';
import { CryptosService } from './services/external/cryptos.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ProductsComponent } from './products/products.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderService } from './services/order.service';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrdersComponent } from './orders/orders.component';
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    ClientFormComponent,
    ClientsComponent,
    WalletAdressComponent,
    ProductFormComponent,
    AdminProductsComponent,
    ProductsComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ShoppingCartComponent,
    ProductQuantityComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    MyOrdersComponent,
    OrdersComponent,


  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    HttpModule,
    HttpClientModule,
    
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'clients/new', component: ClientFormComponent },
      { path: 'admin/products/new', component: ProductFormComponent, canActivate:[AuthGuard,AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate:[AuthGuard,AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate:[AuthGuard] },
      { path: 'myOrders', component: MyOrdersComponent, canActivate:[AuthGuard] },
      { path: 'admin/orders', component: OrdersComponent, canActivate:[AuthGuard,AdminAuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate:[AuthGuard] },

      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'walletAdress/:walletAdress/clientId/:clientId', component: WalletAdressComponent },
      { path: 'walletAdress/:walletAdress/clientId/:clientId', component: WalletAdressComponent },

 


    ])    
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CurrencyService,
    ClientService,
    EthermineService,
    HttpClientModule,
    UsdService,
    CryptosService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
    
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
