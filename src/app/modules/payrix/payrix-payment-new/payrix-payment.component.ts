import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { PayrixService } from '../service/payrix.service';
declare var PayFields;
@Component({
  selector: 'edex-payrix-payment-new',
  templateUrl: './payrix-payment.component.html',
  styleUrls: ['./payrix-payment.component.scss']
})
export class PayrixPaymentNewComponent implements OnInit {
  paramFields: { name?:string, email?:string, phone?:string, 
      address?:string, city?:string, state?:string, zip?:string,
  } = { name:'', email:'', phone:'', address:'', state:'', city:'', zip:''};
  loading:boolean = false;
  payrixAPi =  environment.payrix.api;
  total:string;
  skuParam:string;
  PymentForm:FormGroup
  submited:boolean=false
  today = new Date();
  id: any;
  redirectUrl:string = '';
  covertdate:string=''
  failedUrl:string = '';
  merchant_id = environment.payrix.merchant;
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
    this.total= this._activatedRoute.snapshot.queryParamMap.get('amount');
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
    this.initPayrixForm();
  }

  initPayrixForm() {
    // cardCity
    // cardState
    // cardZipcode
    if(PayFields) {
      PayFields.config.apiKey = environment.payrix.api;
      PayFields.config.merchant = environment.payrix.merchant;
      PayFields.config.amount = parseFloat(this.total)*100;

      PayFields.customizations = {
        style: {
          ".input": {
            "padding": "10px",
            "border": "2px solid #eee",
            "border-radius": "6px",
            "width": "90%",
            "margin-top": "5px"
          },
          ".card-icon" :{
            "top": "15px",
            "right": "25px"
          }
        }
      }

      PayFields.fields = [
        {type: "number", element: "#cardNumber"},
        {type: "cvv", element: "#cardCVV"},
        {type: "name", element: "#cardName", values: { name: this.paramFields.name || '' } },
        {type: "address", element: "#cardAddress", values: {
          address: this.paramFields.address || '',
          city: this.paramFields.city || '',
          state: this.paramFields.state || '',
          zip: this.paramFields.zip || '',
          email: this.paramFields.email || '',
          phone: this.paramFields.phone || '',
        }},
        {type: "expiration", element: "#cardExpr"}
      ];

      PayFields.onSuccess = (response)=> { this.payrixSuccess(response)}
      PayFields.onFailure = (response)=> { this.payrixFailure(response)}
      PayFields.onValidationFailure = () =>{ this.payrixValidationFail()}
      PayFields.onFinish = (response)=> { this.payrixonFinish(response)}
      // PayFields.button = {element: "#cardSubmit", value: "Pay"};
    } else {
      setTimeout(() => { this.initPayrixForm()}, 1000);
    }
  }

  payrixSuccess(response) {
    this.loading = false;
    if(response && response.data && response.data.length){
      let data:any = { paymentResponse: response.data[0]};
      data.txnId = response.data[0].id;
      data.total = this.total;
      data.orderId = this.orderNo;
      data.sku = this.skuParam;
      data.vCardNo = new Date().getTime();
      this.loading = true;
      this._payrixservice.stallerToken(data.paymentResponse).subscribe(stallerRes => {
        if(stallerRes && stallerRes.data) {
          data.stallerResponse = stallerRes.data;
          data.stallerToken = stallerRes.data.id;
          data.stallerAccount = stallerRes.data.to_account;
          this.saveTxn(data);
        } else {
          this.saveTxn(data);
        }
      }, error => {
        this.saveTxn(data);
      }) 
    }
  }

  saveTxn(data:any) {
    this._payrixservice.saveTxn(data).subscribe(res => {
      this.loading = false;
      if(!res.error) {
        let prms = `acctNo=${data.stallerAccount || ''}&orderNo=${this.orderNo}&vcardNo=${data.vCardNo}&txnId=${data.txnId}`;
        let url = this.redirectUrl.indexOf('?') > -1 ? `${this.redirectUrl}&${prms}` : `${this.redirectUrl}?${prms}` ;
        window.location.replace(url);
      } else {
        this._snackBar.open(res.msg, '', { duration: 2000 });
      }
    }, error => {
      this.loading = false;
      this._snackBar.open('Oops! something went wrong while processing payment.', '', { duration: 2000 });
    })
  }
  payrixFailure(response) {
    this.loading = false;
    // console.log('error', response);
  }
  payrixValidationFail() {
    this.loading = false;
  }
  payrixonFinish(response) {
    this.loading = false;
    // console.log('onfinish', response);
  }

  submitPayrix() {
    if(PayFields) {
      this.loading = true;
      PayFields.submit();
    }
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
