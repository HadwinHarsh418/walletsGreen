import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
// import { AdminApiService } from '../services/admin-api.service';
import { LunexService } from '../services/lunex.service';


@Component({
  selector: 'edex-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderForm:FormGroup
  submit:boolean=false
  products:any[] =[];
  
  constructor(private _fb:FormBuilder, private adminApis: LunexService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getProducts();
    this.setordersform() 
  }

  getProducts() {
    this.adminApis.getProducts().subscribe(
      res => {
        if(!res.error) {
          this.products = res.body;
          if(!this.adminApis.allProducts.length) {
            this.adminApis.allProducts = this.products;
          }
        }
      }, error => {

      }
    )
  }
  setordersform(){
    // <!-- amount, lang, merchantid, merchantname, phone, promo_phone, quantity, sku -->
    this.orderForm=this._fb.group({
      amount:['',Validators.required],
      phone:['2111111111',Validators.required],
      lang:['en'],
      merchantid:[''],
      merchantname:[''],
      promo_phone:[''],
      quantity:[''],
      product:['', Validators.required],
      sku:['',Validators.required],
    })
    this.orderForm.get('product').valueChanges.subscribe(res => {
      this.orderForm.patchValue({sku: res});
    })
  }

  submitOrders(){
    this.submit = true
    if(this.orderForm.invalid){
      return
    }

    let data={
      amount:parseInt(this.orderForm.value.amount),
      phone:this.orderForm.value.phone,
      lang:this.orderForm.value.lang,
      merchantid:this.orderForm.value. merchantid,
      merchantname:this.orderForm.value.merchantname,
      promo_phone:this.orderForm.value.promo_phone,
      quantity:this.orderForm.value.quantity,
      sku:this.orderForm.value.sku,
    }    
    this.adminApis.orderTopup(data).subscribe(res=>{
      let msg = (res && res.body && res.body.Message) ? res.body.Message  : '';
      if(res && res.body && res.body.Order){
        msg = 'Order Added Successfully'
        this.orderForm.reset({
          amount:"",
          phone:"2111111111",
          sku:"",
        });
      }
      this._snackBar.open(msg, '', { duration: 2000 });      
      this.submit = false;
    }, error => {
      this.submit = false;
      this._snackBar.open('Oops! something went wrong, please try again later.', '', { duration: 2000 });
    })
  }

}
