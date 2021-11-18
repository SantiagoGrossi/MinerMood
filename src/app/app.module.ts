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
import { ProductService } from './product.service';
import { ClientFormComponent } from './admin/client-form/client-form.component';
import { ClientsComponent } from './clients/clients.component';
import { CurrencyService } from './services/currency.service';
import { ClientService } from './services/client.service';
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    ClientFormComponent,
    ClientsComponent,


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
    NgbModule.forRoot(),
    RouterModule.forRoot([

      { path: 'login', component: LoginComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'clients/new', component: ClientFormComponent },

 


    ])    
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    ProductService,
    CurrencyService,
    ClientService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
