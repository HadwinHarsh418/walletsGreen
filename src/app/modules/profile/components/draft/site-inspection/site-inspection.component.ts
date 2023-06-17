import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UpdateMerchantDetail, UpdateMerchantDetailSuccess } from '@modules/profile/actions/merchant-detail.actions';
import { select, Store } from '@ngrx/store';
import * as loginReducers from '@modules/login/reducers';
import * as merchantReducers from '@modules/profile/reducers';
import { Subscription } from 'rxjs';
import { AddCommentDialogComponent } from '@modules/profile/components/draft/add-comment-dialog/add-comment-dialog.component';
import { MERCHANT_COMMENT_TYPE } from '@root/resources/enums/merchant-comment-types.enum';
import { IMerchantComment } from '@interfaces/merchant-comment.interface';
import { resize } from '@root/utils/resize';
import { MatDialog } from '@angular/material';
import { MerchantDetailService } from '@modules/profile/services/merchant-detail.service';
import { MessengerService } from '@modules/messenger/messenger.service';
import { isSetInput } from '@modules/login/services/utils';
import { isDefined } from '@angular/compiler/src/util';


@Component({
  selector: 'edex-site-inspection',
  templateUrl: './site-inspection.component.html',
  styleUrls: ['./site-inspection.component.scss']
})
export class SiteInspectionComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
  public pending$ = this.store.pipe(select(merchantReducers.getUpdateMerchantDetailPending));
  public user$ = this.store.pipe(select(loginReducers.getUser));
  public status = '';
  public smallScreen = false;
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

  public siteInspectionFormGroup: FormGroup;
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
    this.products.forEach((product) => {
      productControls[product.key] = new FormControl(product.value);
    });

    this.siteInspectionFormGroup = this.fb.group({

      merchantProperty: [''],
      area: [''],
      zoneType: [''],
      locationOfInventionary: [''],
      inventonaryConsistent: [''],
      locationSurvey: [''],
      doesInsideMatchGoodSold: [''],
    });

    this.sub = this.merchantDetail$.subscribe((merchantDetail) => {
      if (merchantDetail) {
        const {
          merchantProperty, area, zoneType, locationOfInventionary, inventonaryConsistent, locationSurvey,
          doesInsideMatchGoodSold, salesComments, siteInspectionStatus
        } = merchantDetail;
        console.log(merchantDetail);
        this.status = siteInspectionStatus;

        this.user$.subscribe((user) => {
          if (user) {
            if (user.role != 'Merchant') {
              this.siteInspectionFormGroup.patchValue({
                merchantProperty: '',
                area: '',
                zoneType: '',
                locationOfInventionary: '',
                inventonaryConsistent: '',
                locationSurvey: '',
                doesInsideMatchGoodSold: ''
              });
              this.siteInspectionFormGroup.patchValue({
                merchantProperty, area, zoneType, locationOfInventionary, inventonaryConsistent, locationSurvey,
                doesInsideMatchGoodSold
              });
            }
          }
        })
        this.siteInspectionFormGroup.patchValue({
          merchantProperty: isSetInput(this.siteInspectionFormGroup.get('merchantProperty'), merchantProperty),
          area: isSetInput(this.siteInspectionFormGroup.get('area'), area),
          zoneType: isSetInput(this.siteInspectionFormGroup.get('zoneType'), zoneType),
          locationOfInventionary: isSetInput(this.siteInspectionFormGroup.get('locationOfInventionary'), locationOfInventionary),
          inventonaryConsistent: isSetInput(this.siteInspectionFormGroup.get('inventonaryConsistent'), inventonaryConsistent),
          locationSurvey: isSetInput(this.siteInspectionFormGroup.get('locationSurvey'), locationSurvey),
          doesInsideMatchGoodSold: isSetInput(this.siteInspectionFormGroup.get('doesInsideMatchGoodSold'), doesInsideMatchGoodSold),
        });

        if (salesComments) {
          this.comments = salesComments;
        }
        this.submitted = isDefined(merchantProperty) || isDefined(area) || isDefined(zoneType) || isDefined(locationOfInventionary) || isDefined(inventonaryConsistent) || isDefined(locationSurvey) || isDefined(doesInsideMatchGoodSold);
      }
    });
  }


  save() {
    this.store.dispatch(new UpdateMerchantDetail({
      userId: this.userId,
      merchantDetail: {
        ...this.siteInspectionFormGroup.value,
        sectionField: 'siteInspectionStatus'
      }
    }));
  }

  isFormValid(): boolean {
    const {
      merchantProperty, area, zoneType, locationOfInventionary, inventonaryConsistent, locationSurvey,
      doesInsideMatchGoodSold
    } = this.siteInspectionFormGroup.value;


    return true;
  }





  openDialog(): void {
    this.dialog.open(AddCommentDialogComponent, {
      data: {
        merchantId: this.userId,
        commentType: MERCHANT_COMMENT_TYPE.SALES,
        comments: this.comments
      }
    });
  }

  approveSection() {
    this.merchantApiService.approveSection(this.userId, 'siteInspectionStatus', true)
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
  @HostListener('window:resize', ['$event'])
  listenResize() {
    this.smallScreen = resize('sm') || resize('xs') || resize('md');
  }

  rejectSection() {
    this.merchantApiService.approveSection(this.userId, 'siteInspectionStatus', false)
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

