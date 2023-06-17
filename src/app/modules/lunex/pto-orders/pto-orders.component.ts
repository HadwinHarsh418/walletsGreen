import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { LunexService } from '../services/lunex.service';

@Component({
  selector: 'edex-pto-orders',
  templateUrl: './pto-orders.component.html',
  styleUrls: ['./pto-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PTOOrdersComponent implements OnInit {

  dataSource:any[]=[];
  time:any
  

  columnsToDisplay = ['orderId', 'customer', 'transactionAmount', 'vCardNo', 'stellarToken', 'transactionId', 'createdAt'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  constructor(private lunexService: LunexService) { 
    this.getTransactions();
  }

  ngOnInit() {
  }

  getTransactions() {
    this.lunexService.getTransactions().subscribe(res => {
      if(res && res.status) {
        res.result.map(item => {
          item.vCardNo = item.vCardNo || '-'
          let dt = new Date(item.createdAt);
          item.createdAt = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}`
          item.paymentResponse = (item.paymentResponse) ? JSON.parse(item.paymentResponse) : null;
          item.customer = (item.paymentResponse) ? `${item.paymentResponse.first} ${item.paymentResponse.last}` : '';
          item.stallerResponse = (item.stallerResponse) ? JSON.parse(item.stallerResponse) : null;
          return item;
        })
        this.dataSource = res.result;
      }
    })
  }

}
