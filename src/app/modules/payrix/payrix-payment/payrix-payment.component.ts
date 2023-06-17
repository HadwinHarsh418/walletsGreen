import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { parse } from 'querystring';

import { map,find } from 'rxjs/operators';
import { PayrixService } from '../service/payrix.service';
import { luhnValidator } from '../validator/cardValidator';

@Component({
  selector: 'edex-payrix-payment',
  templateUrl: './payrix-payment.component.html',
  styleUrls: ['./payrix-payment.component.scss']
})
export class PayrixPaymentComponent implements OnInit {
  paramFields: { name?:string, email?:string, phone?:string, 
    address?:string, city?:string, state?:string, zip?:string,
  } = { name:'', email:'', phone:'', address:'', state:'', city:'', zip:''};
  total:string;
  skuParam:string;
  PymentForm:FormGroup
  submited:boolean=false
  today = new Date();
  id: any;
  redirectUrl:string = '';
  covertdate:string=''
  failedUrl:string = '';
  merchant_id =environment.payrix.merchant;
  InvalidRequest: boolean = false;
  split_date: any[];
  dateme: Date;
  cardValid: boolean=false;
  total1: any;
  orderNo: string;
  cardType:string = '';
  cards = ['Visa','Mastercard','Discover','AMEX','JCB',]
  cardSrc = {
    Visa: 'assets/img/cards/Visa.png',
    Mastercard : 'assets/img/cards/Mastercard.png',
    Discover : 'assets/img/cards/Discover.png',
    AMEX : 'assets/img/cards/AMEX.png',
    JCB : 'assets/img/cards/JCB.png',
  }
  constructor(private _fb:FormBuilder,
    private _activatedRoute:ActivatedRoute,
    private _payrixservice:PayrixService,
    private _router:Router,
    private _snackBar: MatSnackBar,
    public datepipe: DatePipe) { 
      
    }
  ngOnInit() {
    this.SetPaymentForm()
    this.total= this._activatedRoute.snapshot.queryParamMap.get('amount');
    // this.total1= this._activatedRoute.queryParams.pipe(find(x=>x.amount)).subscribe(n=>{
    //   console.log('logppp',n);
      
    // })
    this.skuParam = this._activatedRoute.snapshot.queryParamMap.get('sku');
    this.redirectUrl = this._activatedRoute.snapshot.queryParamMap.get('redirect_url');
    this.failedUrl = this._activatedRoute.snapshot.queryParamMap.get('failed_url');
    this.orderNo = this._activatedRoute.snapshot.queryParamMap.get('orderNo');
    Object.keys(this.paramFields).forEach(item => {
      this.paramFields[item] = this._activatedRoute.snapshot.queryParamMap.get(item);
    });
    if(!this.redirectUrl || !this.total || !this.skuParam) {
      this.InvalidRequest = true;
      this._snackBar.open('Invalid payment details! Please check data and try again.','',{duration:2000})
    }

    let currentDateTime =this.datepipe.transform((new Date), 'MM/yy');
  
    console.log('current',currentDateTime);

  
  }

  
  date1(e){
  console.log('valifd',e.target.value);
  let te="20"
  this.covertdate=(e.target.value)
  this.split_date=this.covertdate.split('/')
  // this.myArray.toString()
  console.log("covertyui",this.split_date.toString());
  this.dateme=new Date( 20+this.split_date[1],this.split_date[0]-1)
  console.log('Stringdata-:',this.dateme);
  console.log('freshdata',this.datepipe.transform(this.dateme,'MM-yy'));

  
  if(this.today<=this.dateme){
    this.cardValid = false;
    console.log('future date');
  }
    else{
      this.cardValid = true;
      console.log('olde date');
    }
    
  // let fixdate=new Date(this.covertdate)
  // // const date = this.datepipe.transform( new Date(this.covertdate),'MM/yy');
  // console.log('plpl',fixdate); 
  }

  SetPaymentForm(){
    this.PymentForm=this._fb.group({
      number:['',Validators.compose(
        [
          Validators.required,Validators.minLength(16),Validators.maxLength(16),luhnValidator()
        ])],
      name:[this.paramFields.name || '',Validators.required],
      expiration:['',Validators.required],
      cvv:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(3),])],
      Address:[this.paramFields.address || '',Validators.required],
      city:[this.paramFields.city || '',Validators.required],
      state:[this.paramFields.state || '',Validators.required],
      zipcode:[this.paramFields.zip || '',Validators.required],
    });
    this.PymentForm.get('number').valueChanges.subscribe(res => {
      if(res) { 
        this.cardType = this.GetCardType(res);
      } else {
        this.cardType = '';
      }
      console.log(res, this.cardType);
    })
  }
 
  submit(){
    if(this.InvalidRequest) {
      this._snackBar.open('Invalid payment details! Please check data and try again.','',{duration:2000})
      return;
    }
    Object.keys(this.PymentForm.controls).forEach(
      item => {
        this.PymentForm.get(item).markAsDirty();
      }
    )
    this.submited=true
    if (this.PymentForm.invalid){
      return;
    }
    let name = this.PymentForm.value.name.split(' ');
    let body= {
      merchant:this.merchant_id,
      type:1,
      origin:2,
      name:this.PymentForm.value.name,
      first:name[0],
      last: name.length > 1 ? name[1] : '',
      address1:this.PymentForm.value.Address,
      city:this.PymentForm.value.city,
      state:this.PymentForm.value.state,
      zip:this.PymentForm.value.zipcode,
      sku:this.skuParam,
      payment:{
        method:2,
        number:parseInt( this.PymentForm.value.number),
        cvv:this.PymentForm.value.cvv,
      },
      expiration:this.PymentForm.value.expiration.split('/').join(''),
      total:parseFloat(this.total)*100,
    }
    this._payrixservice.post(body).subscribe(res=>{
      if(res.body && res.body.response && !res.body.response.errors.length){
        this._snackBar.open('Successful Payment','',{duration:2000})
        let txnId = res.body.response.data ? res.body.response.data[0].id : '';
        let token = res.body.token || '';
        let accNo = res.body.to_account || '';
        let pram = `acctNo=${accNo || '' }&orderNo=${this.orderNo}&vcardNo=${new Date().getTime()}&txnId=${txnId}`;
        let url = this.redirectUrl.indexOf('?') > -1 ? `&${pram}` : `?${pram}` ;
        console.log(url);
        window.location.replace(url);
      }
      else {
        if(res.body && res.body.response) {
          this._snackBar.open(res.body.response.errors[0].msg,'',{duration:2000})
        } else {
          this._snackBar.open(res.msg || 'Oops! Payment Failed','',{duration:2000})
        }
      }
    }, error => {
      this._snackBar.open('Oops! Payment Failed.', '', { duration: 2000 });
    })
  }


  get f(){
    return this.PymentForm.controls
  }

GetCardType(number)
{
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // Mastercard 
    // Updated for Mastercard 2017 BINs expansion
    if (/^5[1-5]/.test(number)) 
        return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "AMEX";

    // Discover
    re = new RegExp("^6011|64[4-9]|65");
    if (number.match(re) != null)
        return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";

    return "";
}


  states = [
    { value: 'AK', name: 'Alaska'},
    { value: 'TX', name: 'Texas'},
    { value: 'AL', name: 'Alabama'},
    { value: 'AR', name: 'Arkansas'},
    { value: 'AZ', name: 'Arizona'},
    { value: 'CA', name: 'California'},
    { value: 'CO', name: 'Colorado'},
    { value: 'CT', name: 'Connecticut'},
    { value: 'DC', name: 'DistrictofColumbia'},
    { value: 'DE', name: 'Delaware'},
    { value: 'FL', name: 'Florida'},
    { value: 'GA', name: 'Georgia'},
    { value: 'HI', name: 'Hawaii'},
    { value: 'IA', name: 'Iowa'},
    { value: 'ID', name: 'Idaho'},
    { value: 'IL', name: 'Illinois'},
    { value: 'IN', name: 'Indiana'},
    { value: 'KS', name: 'Kansas'},
    { value: 'KY', name: 'Kentucky'},
    { value: 'LA', name: 'Louisiana'},
    { value: 'MA', name: 'Massachusetts'},
    { value: 'MD', name: 'Maryland'},
    { value: 'ME', name: 'Maine'},
    { value: 'MI', name: 'Michigan'},
    { value: 'MN', name: 'Minnesota'},
    { value: 'MO', name: 'Missouri'},
    { value: 'MS', name: 'Mississippi'},
    { value: 'MT', name: 'Montana'},
    { value: 'NC', name: 'NorthCarolina'},
    { value: 'ND', name: 'NorthDakota'},
    { value: 'NE', name: 'Nebraska'},
    { value: 'NH', name: 'NewHampshire'},
    { value: 'NJ', name: 'NewJersey'},
    { value: 'NM', name: 'NewMexico'},
    { value: 'NV', name: 'Nevada'},
    { value: 'NY', name: 'NewYork'},
    { value: 'OH', name: 'Ohio'},
    { value: 'OK', name: 'Oklahoma'},
    { value: 'OR', name: 'Oregon'},
    { value: 'PA', name: 'Pennsylvania'},
    { value: 'RI', name: 'RhodeIsland'},
    { value: 'SC', name: 'SouthCarolina'},
    { value: 'SD', name: 'SouthDakota'},
    { value: 'TN', name: 'Tennessee'},
    { value: 'TX', name: 'Texas'},
    { value: 'UT', name: 'Utah'},
    { value: 'VA', name: 'Virginia'},
    { value: 'VT', name: 'Vermont'},
    { value: 'WA', name: 'Washington'},
    { value: 'WI', name: 'Wisconsin'},
    { value: 'WV', name: 'WestVirginia'},
    { value: 'WY', name: 'Wyoming'}
    ];
  
}
