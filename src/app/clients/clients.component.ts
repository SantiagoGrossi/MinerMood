import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { DataTableResource } from 'angular-4-data-table';
import { Client } from '../models/client';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  tableResource: DataTableResource<Client>;
  subscription : Subscription;
  filteredClients: any[];
  clients: Client[];
  items: Client[];
  itemCount: number;
  clients$;

  constructor(private clientService: ClientService) { 
    this.subscription = this.clientService.getAll()
      .subscribe(clients =>{
        this.filteredClients = this.clients = clients;
        this.initializeTable(clients);
      })
  }

  ngOnInit() {
  }
  private initializeTable( clients: Client[]){
    this.tableResource = new DataTableResource(clients);
    this.tableResource.query({offset: 0})
      .then(items => this.items = items)
    this.tableResource.count()
      .then(count => this.itemCount = count)
  }

  reloadItems(params){
     if (!this.tableResource) return;

     this.tableResource.query(params) .then(items => this.items = items);
  }

  filter (query : string){
     this.filteredClients = (query) ?
      this.clients.filter(c=> c.name.toLowerCase().includes(query.toLowerCase())):
      this.clients;

      this.initializeTable(this.filteredClients);
  }
  

  

  
}
