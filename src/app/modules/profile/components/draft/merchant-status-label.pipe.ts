import { Pipe, PipeTransform } from '@angular/core';
import { MERCHANT_STATUS } from '@root/resources/enums/merchant-status.enum';

@Pipe({
  name: 'merchantStatusLabel'
})
export class MerchantStatusLabelPipe implements PipeTransform {

  transform(status: string): any {
    if (status === MERCHANT_STATUS.WEB) {
      return 'Web applications';
    }
    if (status === MERCHANT_STATUS.UPLOAD) {
      return 'Information upload stage';
    }
    if (status === MERCHANT_STATUS.ASSESSED) {
      return 'Being assessed';
    }
    if (status === MERCHANT_STATUS.APPROVED) {
      return 'Approved';
    }
    if (status === MERCHANT_STATUS.INTEGRATION) {
      return 'Website/POS integration Stage';
    }
    if (status === MERCHANT_STATUS.PROCESSING) {
      return 'Live and Processing';
    }

    return  status;
  }
}
