import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { errorCheck } from '@root/utils/error-check';
import { map } from 'rxjs/operators';
import { MERCHANT_COMMENT_TYPE } from '@root/resources/enums/merchant-comment-types.enum';
import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantDetailService {

  constructor(
    private http: HttpService
  ) { }

  getMerchantDetail(userId) {
    if(userId){
    return this.http.get(`${environment.API_URL}/api/merchants/${userId}/detail`)
      .pipe(
        map(res => errorCheck(res)),
        map(
          res => res.result,
          error => { throw error; }
        )
      );
      }
  }

  updateMerchantDetail(userId: string, details: any) {
    return this.http.put(
      `${environment.API_URL}/api/merchants/${userId}/detail`,
      JSON.stringify(details)
    )
      .pipe(
        map(res => errorCheck(res)),
        map(
          res => res.result,
          err => { throw err; }
        )
      );
  }

  addComment(merchantId: string, commentType: MERCHANT_COMMENT_TYPE, content: string) {
    return this.http.put(
      `${environment.API_URL}/api/merchants/${merchantId}/comment`,
      JSON.stringify({ commentType, content })
    )
      .pipe(
        map(res => errorCheck(res)),
        map(
          res => res.result,
          err => { throw err; }
        )
      );
  }

  approveMerchant(merchantId: string) {
    return this.http.post(`${environment.API_URL}/api/merchants/${merchantId}/approve`, {})
      .pipe(
        map(res => errorCheck(res)),
        map(
          res => res.result,
          err => { throw err; }
        )
      );
  }

  approveSection(merchantId: string, field: string, approved: boolean) {
    return this.http.post(`${environment.API_URL}/api/merchants/${merchantId}/section/approve`, {
      field,
      approved,
    }).pipe(
      map(res => errorCheck(res)),
      map(
        res => res.result,
        err => { throw err; }
      )
    );
  }

  assessingSection(merchantId: string, field: string) {
    return this.http.post(`${environment.API_URL}/api/merchants/${merchantId}/section/assessing`, {
      field,
    }).pipe(
      map(res => errorCheck(res)),
      map(
        res => res.result,
        err => { throw err; }
      )
    );
  }

  getMerchantTypes() {
    return this.http.get(`${environment.API_URL}/api/merchants/types`)
      .pipe(
        map(res => errorCheck(res)),
        map(
          res => res.result,
          error => { throw error; }
        )
      );
  }
}
