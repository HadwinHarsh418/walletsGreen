import { Component, OnInit } from '@angular/core';
// import { LunexService } from '../services/admin-api.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { LunexService } from '../services/lunex.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edex-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderComponent implements OnInit {
  addfrom:FormGroup;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  fromDate:any =''
  toDate:any = '';
  dataSource:any[]=[];
  time:any
  displayedColumns = ['Cid','productName','OrderType','PaymentType','SellerAcctType','Time','TopupName','TopupPhone','TxId', 'Amount', 'Sku','Seller']
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  products:any[] =[];
  sellerId:any = '';
  constructor(
    private adminApis: LunexService,
    private _snackBar: MatSnackBar,
    private _fb:FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe(res => {
      if(res && res.id) {
        this.sellerId = res.id;
      }
    })
  }

  ngOnInit() {
    this.setform()
    this.getProducts();
  }

  getProducts() {
    this.adminApis.getProducts().subscribe(
      res => {
        if(!res.error) {
          this.products = res.body;
          if(!this.adminApis.allProducts.length) {
            this.adminApis.allProducts = this.products;
          }
          this.getdata();
        }
      }, error => {

      }
    )
  }

  getdata(){
    let data= JSON.parse(JSON.stringify(this.addfrom.value));
    data.To_Date = new Date();
    data.To_Date.setDate(data.To_Date.getDate() + 1);
    data.seller = this.sellerId;
    if((data.From_Date && !data.To_Date) || (!data.From_Date && data.To_Date)) {
      this._snackBar.open('Please fill both dates', '', {duration: 2000});
    }

    this.adminApis.getOrder(data).subscribe(res=>{
      if(res && !res.error) {
        this.dataSource = res.body && res.body.List ?  res.body.List : [];
        this.dataSource.map(item => {
          if(this.products) {
            let prd = this.products.filter(prd => prd.Sku  == item.Sku);
            item.productName =  (prd.length) ? prd[0].Name : '';
          }
          item.newTime = (item.Time) ? item.Time.replace(/[//,(,),A-Z,a-z]/ig, '') : '';
          item.Time = new Date(Number(item.newTime.split('-')[0]))
          return item;
        })
      } else {
        this.dataSource = [];
        this._snackBar.open(res.msg, '',  { duration: 2000 });
      }
    }, error => {
      this._snackBar.open('Oops! something went wrong, please try again later.', '', { duration: 2000 });
      this.dataSource = [];
    })
  }

setform(){
  let today = new Date();
  let backSvendays = new Date();
  backSvendays.setDate(backSvendays.getDate() - 7);
  this.addfrom=this._fb.group({
    From_Date:[backSvendays],
    To_Date:[today]
  })
}

get f(){
  return this.addfrom.controls;
}

  searchByDate() {
    this.getdata();
  }

}
