import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EthermineService } from '../ethermine.service';
import { Miner } from '../models/miner';

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
  constructor( private route: ActivatedRoute, private ethService: EthermineService) {
    
    

    this.currentWallet = this.route.snapshot.paramMap.get('walletAdress');
    if (this.currentWallet.length > 0)
    {
        this.ethService.getMinerStatics(this.currentWallet).subscribe(data =>{
        this.status = data.status;
        this.unpaid = (data.data.currentStatistics.unpaid / 1000000000000000000).toFixed(3);
        this.workersQuantity = data.data.currentStatistics.activeWorkers;
        this.lastSeen = data.data.currentStatistics.lastSeen;
        this.reportedHashrate = (data.data.currentStatistics.reportedHashrate/1000000).toFixed(1);
        this.currentHashrate = (data.data.currentStatistics.currentHashrate/1000000).toFixed(1);
        

      });
      
    }
    else
    {
      this.currentWallet =null;
    }

   }

  

  ngOnInit() {
   
  }

}
