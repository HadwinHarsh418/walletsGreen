import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UpdateMerchantDetail, UpdateMerchantDetailSuccess } from '@modules/profile/actions/merchant-detail.actions';
import { select, Store } from '@ngrx/store';
import * as loginReducers from '@modules/login/reducers';
import * as merchantReducers from '@modules/profile/reducers';
import * as Percentages from '@modules/login/components/percentage';
import { Subscription } from 'rxjs';
import { AddCommentDialogComponent } from '@modules/profile/components/draft/add-comment-dialog/add-comment-dialog.component';
import { MERCHANT_COMMENT_TYPE } from '@root/resources/enums/merchant-comment-types.enum';
import { IMerchantComment } from '@interfaces/merchant-comment.interface';
import { MatDialog } from '@angular/material';
import { MerchantDetailService } from '@modules/profile/services/merchant-detail.service';
import { MessengerService } from '@modules/messenger/messenger.service';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'edex-product-service-offer',
  templateUrl: './product-service-offer.component.html',
  styleUrls: ['./product-service-offer.component.scss']
})
export class ProductServiceOfferComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
  public pending$ = this.store.pipe(select(merchantReducers.getUpdateMerchantDetailPending));
  public user$ = this.store.pipe(select(loginReducers.getUser));
  public status = '';
  public percentagesOptions = Percentages.slim_2;
  public percentageOptions = [
    0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
  ];

  public productDeliverOptions = [
    { value: 'Immediately', view: 'Immediately' },
    { value: '24 Hours', view: '24 Hours' },
    { value: '2 Days', view: '2 Days' },
    { value: '3-10 Days', view: '3-10 Days' },
    { value: '10-30 Days', view: '10-30 Days' },
    { value: '31-90 Days', view: '31-90 Days' },
  ];

  public products = [
    { key: 'product1', value: '' },
  ];

  public productFormGroup: FormGroup;
  public submitted = false;
  public comments: IMerchantComment[] = [];

  @Input() userId: string;

  constructor(
    private store: Store<loginReducers.State>,
    private fb: FormBuilder,
    private merchantApiService: MerchantDetailService,
    private msgr: MessengerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    const productControls = {};


    this.productFormGroup = this.fb.group({
      mainProducts: new FormGroup(
        productControls
      ),
      salesInitiatedByFF: [null, []],
      salesInitiatedByOL: [null, []],
      salesInitiatedByEM: [null, []],
      salesInitiatedByPH: [null, []],
      salesInitiatedBySC: [null, []],
      productDeliver: [null, []],
      productObligations: ['Yes', []],
      productDescription: ['', []],
      refundPolicy: ['Yes', []],
      dropShipping: ['Yes', []],
      dropShippingPerc: [null, []],
      salesComment: [null, []]
    });

    this.sub = this.merchantDetail$.subscribe((merchantDetail) => {
      this.products.forEach((product) => {
        console.log(product,"product")
        productControls[product.key] = new FormControl(product.value);
      });
      if (merchantDetail) {
        const {
          salesInitiatedByFF, salesInitiatedByOL, salesInitiatedByEM, salesInitiatedByPH, salesInitiatedBySC, productServiceComments,
          productInfoStatus, productDeliver, productObligations, productDescription,
          refundPolicy, dropShipping, dropShippingPerc
        } = merchantDetail;
        let percentageFFObj, percentageOLObj, percentageEMObj, percentagePHObj, percentageSCObj;
        if (salesInitiatedByFF) {
          percentageFFObj = this.percentagesOptions.find(i => i.value == salesInitiatedByFF);
        } else {
          percentageFFObj = "";
        }
        if (salesInitiatedByOL) {
          percentageOLObj = this.percentagesOptions.find(i => i.value == salesInitiatedByOL);
        } else {
          percentageOLObj = "";
        }
        if (salesInitiatedByEM) {
          percentageEMObj = this.percentagesOptions.find(i => i.value == salesInitiatedByEM);
        } else {
          percentageEMObj = "";
        }
        if (salesInitiatedByPH) {
          percentagePHObj = this.percentagesOptions.find(i => i.value == salesInitiatedByPH);
        } else {
          percentagePHObj = "";
        }
        if (salesInitiatedBySC) {
          percentageSCObj = this.percentagesOptions.find(i => i.value == salesInitiatedBySC);
        } else {
          percentageSCObj = "";
        }
        this.status = productInfoStatus;
        this.user$.subscribe((user) => {
          if (user) {
            if (user.role != 'Merchant') {
              this.productFormGroup.patchValue({
                salesInitiatedByFF: 0,
                salesInitiatedByOL: 0,
                salesInitiatedByEM: 0,
                salesInitiatedByPH: 0,
                salesInitiatedBySC: 0,
                productDeliver: '',
                productObligations: '',
                productDescription: '',
                refundPolicy: '',
                dropShipping: '',
                dropShippingPerc: '',
              });
              this.productFormGroup.patchValue({
                salesInitiatedByFF: percentageFFObj,
                salesInitiatedByOL: percentageOLObj,
                salesInitiatedByEM: percentageEMObj,
                salesInitiatedByPH: percentagePHObj,
                salesInitiatedBySC: percentageSCObj,
                productDeliver,
                productObligations,
                productDescription,
                refundPolicy,
                dropShipping,
                dropShippingPerc,
              });
            }
          }
        })
        this.productFormGroup.patchValue({

          salesInitiatedByFF: percentageFFObj,
          salesInitiatedByOL: percentageOLObj,
          salesInitiatedByEM: percentageEMObj,
          salesInitiatedByPH: percentagePHObj,
          salesInitiatedBySC: percentageSCObj,
          productDeliver,
          productObligations,
          productDescription,
          refundPolicy,
          dropShipping,
          dropShippingPerc,
        });

        this.submitted = isDefined(salesInitiatedByFF) ||
          isDefined(salesInitiatedByOL) ||
          isDefined(salesInitiatedByEM) ||
          isDefined(salesInitiatedByPH) ||
          isDefined(salesInitiatedBySC) ||
          isDefined(productDeliver) ||
          isDefined(productObligations) ||
          isDefined(productDescription) ||
          isDefined(refundPolicy) ||
          isDefined(dropShipping) ||
          isDefined(dropShippingPerc);

        const { mainProducts } = merchantDetail;
        const mainProductControls = {};
        this.products = [];
        if (mainProducts) {
          console.log(mainProducts,"mainProducts")

          Object.keys(mainProducts).map(key => {
            mainProductControls[key] = new FormControl(mainProducts[key]);
            this.products.push({ key, value: mainProducts[key] });
          });

          this.productFormGroup.setControl(
            'mainProducts', new FormGroup(mainProductControls)
          );
        }else{
          console.log(mainProducts,"mainProducts")

       

          this.productFormGroup.setControl(
            'mainProducts', new FormGroup(mainProductControls)
          );
        }

        if (productServiceComments) {
          this.comments = productServiceComments;
        }
      }
    });
  }

  addMainProduct(value = '') {
    (this.productFormGroup.controls.mainProducts as FormGroup).addControl(
      `product${this.products.length + 1}`, new FormControl(value)
    );

    this.products.push({
      key: `product${this.products.length + 1}`,
      value: ''
    });
  }

  submit() {
    if (this.isFormValid()) {
      this.store.dispatch(new UpdateMerchantDetail({
        userId: this.userId,
        merchantDetail: {
          mainProducts: this.productFormGroup.controls['mainProducts'].value,
          salesInitiatedByFF: this.productFormGroup.controls['salesInitiatedByFF'].value.value,
          salesInitiatedByOL: this.productFormGroup.controls['salesInitiatedByOL'].value.value,
          salesInitiatedByEM: this.productFormGroup.controls['salesInitiatedByEM'].value.value,
          salesInitiatedByPH: this.productFormGroup.controls['salesInitiatedByPH'].value.value,
          salesInitiatedBySC: this.productFormGroup.controls['salesInitiatedBySC'].value.value,
          productDeliver: this.productFormGroup.controls['productDeliver'].value,
          productObligations: this.productFormGroup.controls['productObligations'].value,
          productDescription: this.productFormGroup.controls['productDescription'].value,
          refundPolicy: this.productFormGroup.controls['refundPolicy'].value,
          dropShipping: this.productFormGroup.controls['dropShipping'].value,
          dropShippingPerc: this.productFormGroup.controls['dropShippingPerc'].value,
          sectionField: 'productInfoStatus'
        }
      }));
    }
  }

  isFormValid(): boolean {
    const {
      salesInitiatedByFF,
      salesInitiatedByOL,
      salesInitiatedByEM,
      salesInitiatedByPH,
      salesInitiatedBySC
    } = this.productFormGroup.value;
    console.log(salesInitiatedByEM, "salesInitiatedByEM");
    if (salesInitiatedByFF.value + salesInitiatedByOL.value + salesInitiatedByEM.value + salesInitiatedByPH.value + salesInitiatedBySC.value !== 100) {
      this.productFormGroup.controls.salesInitiatedByFF.setErrors({ notMatchSum: true });
      this.productFormGroup.controls.salesInitiatedByOL.setErrors({ notMatchSum: true });
      this.productFormGroup.controls.salesInitiatedByEM.setErrors({ notMatchSum: true });
      this.productFormGroup.controls.salesInitiatedByPH.setErrors({ notMatchSum: true });
      this.productFormGroup.controls.salesInitiatedBySC.setErrors({ notMatchSum: true });

      return false;
    }

    return true;
  }

  getErrorSalesInitiatedByFF() {
    return this.productFormGroup.get('salesInitiatedByFF').hasError('notMatchSum') ?
      'The percentage sum should be 100.' : '';
  }

  getErrorSalesInitiatedByOL() {
    return this.productFormGroup.get('salesInitiatedByOL').hasError('notMatchSum') ?
      'The percentage sum should be 100.' : '';
  }

  getErrorSalesInitiatedByEM() {
    return this.productFormGroup.get('salesInitiatedByEM').hasError('notMatchSum') ?
      'The percentage sum should be 100.' : '';
  }

  getErrorSalesInitiatedByPH() {
    return this.productFormGroup.get('salesInitiatedByPH').hasError('notMatchSum') ?
      'The percentage sum should be 100.' : '';
  }

  getErrorSalesInitiatedBySC() {
    return this.productFormGroup.get('salesInitiatedBySC').hasError('notMatchSum') ?
      'The percentage sum should be 100.' : '';
  }

  openDialog(): void {
    this.dialog.open(AddCommentDialogComponent, {
      data: {
        merchantId: this.userId,
        commentType: MERCHANT_COMMENT_TYPE.PRODUCTSALE,
        comments: this.comments
      }
    });
  }

  approveSection() {
    this.merchantApiService.approveSection(this.userId, 'productInfoStatus', true)
      .subscribe(
        (res) => {
          this.msgr.message('This section is approved successfully.');
          this.store.dispatch(new UpdateMerchantDetailSuccess(res));
        },
        (err) => {
          this.msgr.error(err.message);
        }
      );
  }

  rejectSection() {
    this.merchantApiService.approveSection(this.userId, 'productInfoStatus', false)
      .subscribe(
        (res) => {
          this.msgr.message('This section is rejected successfully.');
          this.store.dispatch(new UpdateMerchantDetailSuccess(res));
        },
        (err) => {
          this.msgr.error(err.message);
        }
      );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
