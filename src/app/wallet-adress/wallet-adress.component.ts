import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EthermineService } from '../ethermine.service';
import { Miner } from '../models/miner';
import { CryptosService } from '../services/external/cryptos.service';
import { UsdService } from '../services/external/usd.service';
import {ArrayChangeProfitObject} from '../models/ArrayChangeProfitObject';
import { asTextData } from '@angular/core/src/view';


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
  ethereumValue;
  animationRunning = false;
  notWorking = true;
  hashFijo = 900000000;
  profitethfijo= 0.0000144;
  dificultadActual;
  cuantoPorMhs;
  dailyDolares;
  dailyPesos;
  dailyEth;
  indiceDificultad;
  valorMhs;
  indexArrayChange = 1;

  public arrayChangeProfit:Array<ArrayChangeProfitObject> = [
    {id: 1, timeLapse: 'Diario', days: 1},
    {id: 2, timeLapse: 'Semanal', days: 7},
    {id: 3, timeLapse: 'Mensual', days: 30},
    {id: 4, timeLapse: 'Semanal', days: 30},
];

  constructor( private route: ActivatedRoute, private ethService: EthermineService,
    private dolarService: UsdService, private cryptoService: CryptosService) {
    
    
    this.dolarService.getDolarBlueValue().subscribe(dolarInfo=>{
      this.dolarBlueValue = dolarInfo.venta;
    });

    this.ethService.getDificulty().subscribe(data=>{
      this.dificultadActual = 0.000001 * data.data.hashrate.toFixed();
    });


    this.cryptoService.getEthereumValue().subscribe(ethereum=>{
      this.ethereumValue = ethereum.data.amount;
    });

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
        this.notWorking = this.reportedHashrate>30;

        this.indiceDificultad = (this.hashFijo / this.dificultadActual);
        this.valorMhs = (this.profitethfijo / this.indiceDificultad);
        this.dailyDolares =((this.cuantoPorMhs = this.valorMhs * this.reportedHashrate) * this.ethereumValue).toFixed(2);

        
        this.dailyEth = (this.dailyDolares / this.ethereumValue).toFixed(8);
        this.dailyPesos = (this.dailyDolares * 200).toFixed(); 
        

    });
       
      
    }
    else
    {
      this.currentWallet =null;
    }

   }

  

  ngOnInit() {
    
  }
  ngAfterContentInit(){
    
  }
 
  animateChangeCurrency(){
    this.animationRunning = true;
    setTimeout(()=>{                          
      this.animationRunning = false;
    }, 500);
   
  }
  changeCurrency(){
    this.animateChangeCurrency();
    
    if(this.currentCurrency =='Ethereum'){
      this.currentUnpaid = (this.unpaid * this.ethereumValue).toFixed(2);
      this.currentCurrency = 'USD'
      
    }else if(this.currentCurrency =='USD'){
      this.currentUnpaid = ((this.ethereumValue * this.unpaid)*this.dolarBlueValue).toFixed(2);
      this.currentCurrency = 'ARS'
    }

    else if(this.currentCurrency =='ARS'){
      this.currentUnpaid = this.unpaid;
      this.currentCurrency = 'Ethereum'
    }
   
  }

  changeProfitTimeLapse(){
    this.animateChangeCurrency();
    if(this.indexArrayChange == 3 ){
      this.indexArrayChange =0;
    } 
    if( this.indexArrayChange != 1){
      this.dailyDolares = ((this.cuantoPorMhs = this.valorMhs * this.reportedHashrate) * this.ethereumValue).toFixed(2);
      this.dailyPesos = (this.dailyDolares * 200).toFixed();
      this.dailyEth = (this.dailyDolares / this.ethereumValue).toFixed(8);
    }
    this.dailyPesos = (this.dailyPesos * this.arrayChangeProfit[this.indexArrayChange].days).toFixed();
    this.dailyEth = (this.dailyEth * this.arrayChangeProfit[this.indexArrayChange].days).toFixed(8);
    this.dailyDolares= (this.dailyDolares * this.arrayChangeProfit[this.indexArrayChange++].days).toFixed(2);
    
    
    
  }

}
