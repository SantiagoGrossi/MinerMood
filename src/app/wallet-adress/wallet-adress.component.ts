import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EthermineService } from '../ethermine.service';
import { Miner } from '../models/miner';
import { CryptosService } from '../services/external/cryptos.service';
import { UsdService } from '../services/external/usd.service';

@Component({
  selector: 'app-wallet-adress',
  templateUrl: './wallet-adress.component.html',
  styleUrls: ['./wallet-adress.component.css']
})
export class WalletAdressComponent implements OnInit {

  currentWallet:string;
  status;
  workerName;
  workersQuantity;
  unpaid;
  reportedHashrate;
  currentHashrate;
  lastSeen;
  invalidShares;
  staleShares;
  validShares;
  currentUnpaid;
  currentCurrency ="Ethereum";
  dolarBlueValue;
  ethereumValue
  constructor( private route: ActivatedRoute, private ethService: EthermineService,
    private dolarService: UsdService, private cryptoService: CryptosService) {
    
    
    this.dolarService.getDolarBlueValue().subscribe(dolarInfo=>{
      this.dolarBlueValue = dolarInfo.venta;
    });

    //this.cryptoService.getEthereumValue().subscribe(ethereum=>{
      //this.ethereumValue = ethereum.value;
    //});

    this.currentWallet = this.route.snapshot.paramMap.get('walletAdress');
    if (this.currentWallet.length > 0)
    {
        this.ethService.getMinerStatics(this.currentWallet).subscribe(data =>{
        this.status = data.status;
        this.unpaid = (data.data.currentStatistics.unpaid / 1000000000000000000).toFixed(3);
        this.currentUnpaid = (data.data.currentStatistics.unpaid / 1000000000000000000).toFixed(3);
        this.workersQuantity = data.data.currentStatistics.activeWorkers;
        this.lastSeen = data.data.currentStatistics.lastSeen;
        this.reportedHashrate = (data.data.currentStatistics.reportedHashrate/1000000).toFixed(1);
        this.currentHashrate = (data.data.currentStatistics.currentHashrate/1000000).toFixed(1);
        this.invalidShares = data.data.currentStatistics.invalidShares;
        this.staleShares = data.data.currentStatistics.staleShares;
        this.validShares = data.data.currentStatistics.validShares;
        

      });
      
    }
    else
    {
      this.currentWallet =null;
    }

   }

  

  ngOnInit() {
   
  }
  changeCurrency(){
    if(this.currentCurrency =='USD'){
      this.currentUnpaid = this.unpaid;
      this.currentCurrency = 'Ethereum'
    }else{
      //this.currentUnpaid = ((this.enthereumValue * this.unpaid)*this.dolarBlueValue);
      this.currentCurrency = 'ARS'
    }
   
  }

}
