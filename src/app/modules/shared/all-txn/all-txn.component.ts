import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { LunexService } from '@root/modules/lunex/services/lunex.service';
import * as loginReducers from "@modules/login/reducers";
import { select, Store } from "@ngrx/store";
import { forkJoin, of } from 'rxjs';
import { ROLES } from '@root/resources/enums/role.enum';

@Component({
  selector: 'edex-all-txn',
  templateUrl: './all-txn.component.html',
  styleUrls: ['./all-txn.component.scss']
})
export class AllTxnComponent implements OnInit {

  @Input() onPage:string = ''
  @Input() title:string = 'Transactions'
  dataSource:any[] = [];
  currentPageData:any[] = [];
  paginations = { total:0, pageSize:5}
  public user$ = this.store.pipe(select(loginReducers.getUser));
  payrixTxn:any[]=[];
  LunexTxn:any[]=[];
  PyntTxn:any[]=[];
  products:any[] =[];
  user:any;
  
  constructor(private lunexService: LunexService, private store: Store<loginReducers.State>) { 
  }

  getProducts() {
    this.lunexService.getProducts().subscribe(
      res => {
        if(!res.error) {
          this.products = res.body;
          if(!this.lunexService.allProducts.length) {
            this.lunexService.allProducts = this.products;
          }
          this.getAllTransactions();
        }
      }, error => {

      }
    )
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      console.log(user,'dasd')
      this.user = user;
    });
    this.getProducts();
  }

  paginate(pageNumber=0) {
    let currentIndex = pageNumber*this.paginations.pageSize;
    this.currentPageData = this.dataSource.slice(currentIndex, currentIndex+this.paginations.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.paginations.pageSize = event.pageSize;
    this.paginate(event.pageIndex)
  }

  getAllTransactions() {
    let today = new Date();
    let backSvendays = new Date();
    backSvendays.setDate(backSvendays.getDate() - 7);
    let lunexData= {  From_Date: backSvendays, To_Date:today};

    let payrixTransactions = (this.user.role == ROLES.SUPER_ADMIN || this.user.paymentProcessor == 'Payrix') ? this.lunexService.getTransactions() :of({result:[]});
    let lunexOrdes = (this.user.role == ROLES.SUPER_ADMIN || (this.user.paymentProcessor == 'Payrix')) ? this.lunexService.getOrder(lunexData) : of({body:{ List:[]}}) ;
    let poyntTxn = (this.user.role == ROLES.SUPER_ADMIN) ? this.lunexService.getSuperAdminTransaction() :  (this.user.paymentProcessor != 'Payrix') ? this.lunexService.getMerchantPoynt() : of({data:[]});
    forkJoin(payrixTransactions, lunexOrdes, poyntTxn).subscribe(res => {
      if(res) {

        if(res[0].result) {
          res[0].result.map(item => {
            item.txnType='Payrix';
            item.vCardNo = item.vCardNo || '-'
            let dt = new Date(item.createdAt);
            item.createdAt = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}`
            item.Time = dt;
            item.paymentResponse = (item.paymentResponse) ? JSON.parse(item.paymentResponse) : null;
            item.customer = (item.paymentResponse) ? `${item.paymentResponse.first} ${item.paymentResponse.last}` : '';
            item.stallerResponse = (item.stallerResponse) ? JSON.parse(item.stallerResponse) : null;
            return item;
          })
          this.payrixTxn = res[0].result;
        }
        if(res && !res[1].error) {
          this.LunexTxn = res[1].body && res[1].body.List ?  res[1].body.List : [];
          this.LunexTxn.map(item => {
            item.txnType='Lunex';
            item.newTime = (item.Time) ? item.Time.replace(/[//,(,),A-Z,a-z]/ig, '') : '';
            item.Time = new Date(Number(item.newTime.split('-')[0]));
            if(this.products) {
              let prd = this.products.filter(prd => prd.Sku  == item.Sku);
              item.productName =  (prd.length) ? prd[0].Name : '';
            }
            return item;
          })
        }
        if(res && res[2].data) {
          this.PyntTxn = res[2].data || [];
          this.PyntTxn.map(item => {
            item.txnType='Poynt';
            item.Time = new Date(item.createdAt);
            return item;
          })
        }
        this.dataSource = [...this.payrixTxn, ...this.LunexTxn, ...this.PyntTxn];
        if(this.dataSource.length) {
          this.dataSource.sort((a,b) => a.Time.getTime() > b.Time.getTime() ? -1 : 1);
        }
        this.paginations.total = this.dataSource.length;
        this.paginate();
      }
    }, error => {

    })
  }

  

}
