import { Component, OnInit } from '@angular/core';
import { MessengerService } from '@modules/messenger/messenger.service';
import { MerchantType } from '@interfaces/merchant-type.interface';
import { MerchantDetailService } from '@modules/profile/services/merchant-detail.service';

@Component({
  selector: 'edex-top-merchant-types',
  templateUrl: './top-merchant-types.component.html',
  styleUrls: ['./top-merchant-types.component.scss']
})
export class TopMerchantTypesComponent implements OnInit {

  public types: MerchantType[] = [];

  constructor(
    private merchantDetailApiService: MerchantDetailService,
    private msgr: MessengerService
  ) {
  }

  ngOnInit() {
    this.getMerchantTypes();
  }

  getMerchantTypes() {
    this.merchantDetailApiService.getMerchantTypes().subscribe(
      (res) => {
        this.types = res;
      },
      (err) => {
        this.msgr.error(err.message || 'Failed to get merchant types data.');
      }
    );
  }

}
