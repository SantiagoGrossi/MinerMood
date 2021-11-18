import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  currencies$
  willmine;
  imgUrl;
  constructor(currencyService: CurrencyService,
    private clientService: ClientService,
    private router: Router) {
    this.currencies$ = currencyService.getcurrencies();
   }

  ngOnInit() {
    
  }
  save(client){
    this.clientService.create(client);
    this.router.navigate(['/clients']);
  }
  

  changeCurrencyToMine(value){
    this.willmine = value;
    let crypto = value;

    switch (crypto) {
      case "Ethereum":
          this.imgUrl = "https://cryptoicons.org/api/icon/eth/200";
          break;
      case "Bitcoin":
        this.imgUrl = "https://cryptoicons.org/api/icon/btc/200";
          break;
      case "Ergo":
        this.imgUrl = "https://icoholder.com/media/cache/ico_logo_view_page/files/img/0efed90bce8b58a5c39811448ce0bf87.jpeg";
          break;
      case "Ethereum Classic":
        this.imgUrl = "https://cryptoicons.org/api/icon/etc/200";
        break;
      case "Firo":
        this.imgUrl = "https://logosandtypes.com/wp-content/uploads/2020/12/firo.svg";
        break;
      case "Raven":
        this.imgUrl = "https://cryptoicons.org/api/icon/rvn/200";
        break;
     
    }
  }

}
