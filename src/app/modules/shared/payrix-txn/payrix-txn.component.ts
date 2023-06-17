import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';
import { LunexService } from '@root/modules/lunex/services/lunex.service';

@Component({
  selector: 'edex-payrix-txn',
  templateUrl: './payrix-txn.component.html',
  styleUrls: ['./payrix-txn.component.scss']
})
export class PayrixTxnComponent implements OnInit {
  @Input() onPage:string = ''
  @Output() payrixTotal: EventEmitter<any> = new EventEmitter();
  dataSource:any[] = [];
  currentPageData:any[] = [];
  paginations = { total:0, pageSize:5}
  parixTotalAmount = 0;
  constructor(private lunexService: LunexService) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.lunexService.getTransactions().subscribe(res => {
      if(res && res.status) {
        this.parixTotalAmount = 0;
        res.result.map(item => {
          this.parixTotalAmount += parseFloat(item.transactionAmount);
          item.vCardNo = item.vCardNo || '-'
          let dt = new Date(item.createdAt);
          item.createdAt = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}`
          item.paymentResponse = (item.paymentResponse) ? JSON.parse(item.paymentResponse) : null;
          item.customer = (item.paymentResponse) ? `${item.paymentResponse.first} ${item.paymentResponse.last}` : '';
          item.stallerResponse = (item.stallerResponse) ? JSON.parse(item.stallerResponse) : null;
          return item;
        })
        this.payrixTotal.emit({ total:this.parixTotalAmount});
        this.dataSource = res.result;
        this.paginations.total = this.dataSource.length;
        this.paginate();
      }
    })
  }

  paginate(pageNumber=0) {
    let currentIndex = pageNumber*this.paginations.pageSize;
    this.currentPageData = this.dataSource.slice(currentIndex, currentIndex+this.paginations.pageSize);
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    this.paginations.pageSize = event.pageSize;
    this.paginate(event.pageIndex)
  }

}
