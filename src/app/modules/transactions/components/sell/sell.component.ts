import { Component, OnInit } from '@angular/core';


export interface paymentMethod {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'edex-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})

export class SellComponent implements OnInit {

  	paymentMethods: paymentMethod[] = [
    {value: 'VISA', viewValue: 'VISA 0209'},
    {value: 'MASTERCARD', viewValue: 'MASTERCARD 2341'},
    {value: 'IBAN', viewValue: 'BANK IBAN 2342'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
