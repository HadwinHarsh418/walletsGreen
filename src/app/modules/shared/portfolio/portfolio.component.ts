import { Component, Input, OnInit } from '@angular/core';
import { LunexService } from '@root/modules/lunex/services/lunex.service';

@Component({
  selector: 'edex-portfolio-vcard',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  currencyToggle:string = 'USD';
  toShowPrice = 0;
  convertedPrice = 0;
  @Input() set totalBalance(val) {
    this.toShowPrice = val || 0;
    this.converNow()
  };

  constructor(private lunexService: LunexService) { }

  ngOnInit() {
  }

  converNow() {
    switch(this.currencyToggle) {
      case 'EUR':
        this.convertedPrice = this.toShowPrice * this.lunexService.currencyRates.EUR;
        break;
      case 'GBP' :
        this.convertedPrice = this.toShowPrice * this.lunexService.currencyRates.GBP;
        break;
      default :
        this.convertedPrice = this.toShowPrice;
        break;
    }
  }
  toggleCurrency(type = 'USD') {
    this.currencyToggle = type;
    this.converNow();
  }

}
