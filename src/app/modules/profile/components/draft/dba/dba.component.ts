import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {UpdateMerchantDetail, UpdateMerchantDetailSuccess} from '@modules/profile/actions/merchant-detail.actions';
import { select, Store } from '@ngrx/store';
import * as loginReducers from '@modules/login/reducers';
import * as merchantReducers from '@modules/profile/reducers';
import { resize } from '@root/utils/resize';
import { Subscription } from 'rxjs';
import { isSetInput } from '@modules/login/services/utils';
import { AddCommentDialogComponent } from '@modules/profile/components/draft/add-comment-dialog/add-comment-dialog.component';
import { MERCHANT_COMMENT_TYPE } from '@root/resources/enums/merchant-comment-types.enum';
import { IMerchantComment } from '@interfaces/merchant-comment.interface';
import { MatDialog } from '@angular/material';
import {MerchantDetailService} from '@modules/profile/services/merchant-detail.service';
import {MessengerService} from '@modules/messenger/messenger.service';
import { MerchantType } from '@interfaces/merchant-type.interface';
import { isDefined } from '@angular/compiler/src/util';


@Component({
  selector: 'edex-dba',
  templateUrl: './dba.component.html',
  styleUrls: ['./dba.component.scss']
})
export class DbaComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public user$ = this.store.pipe(select(loginReducers.getUser));
  public types: MerchantType[] = [];
  private merchantDetailSub: Subscription;
  public dbaFormGroup: FormGroup;

  public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
  public comments: IMerchantComment[] = [];
  public status = '';

  @Input() userId: string;

  public submitted =false;
  public smallScreen = false;

  public co = null;
  public pending$ = this.store.pipe(select(merchantReducers.getUpdateMerchantDetailPending));

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


  constructor(
    private store: Store<loginReducers.State>,
    private fb: FormBuilder,
    private merchantApiService: MerchantDetailService,
    private msgr: MessengerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getMerchantTypes();
    const productControls = {};
    this.products.forEach((product) => {
      productControls[product.key] = new FormControl(product.value);
    });

    this.dbaFormGroup = this.fb.group({
      businessId:[''],
      applicationId:[''],
      applicationIdkey:[''],
    });

    this.sub = this.merchantDetail$.subscribe((merchantDetail) => {
      
      if (merchantDetail) {
        const {businessId, applicationId,applicationIdkey,
        } = merchantDetail.merchant;
         
        const {dbaComments} = merchantDetail;
        this.status = merchantDetail.dbaInfoStatus;
        if(dbaComments){
          this.comments =dbaComments;
        }
        this.user$.subscribe((user)=>{
          if(user){
            if(user.role != 'Merchant'){
              this.dbaFormGroup.patchValue({
                businessId:'', 
                applicationId:'',
                applicationIdkey:'',
              });
              this.dbaFormGroup.patchValue({businessId, applicationId,applicationIdkey,
              });
            }
          }
        })

        this.dbaFormGroup.patchValue({
          businessId: isSetInput(this.dbaFormGroup.get('businessId'), businessId),
          applicationId: isSetInput(this.dbaFormGroup.get('applicationId'), applicationId),
          applicationIdkey: isSetInput(this.dbaFormGroup.get('applicationIdkey'), applicationIdkey),
        }
      );
      this.submitted= isDefined(businessId) || isDefined(applicationId) || isDefined(applicationIdkey);
      }
    });
  }

  getMerchantTypes() {
    this.merchantApiService.getMerchantTypes().subscribe(
      (res) => {
        this.types = res;
      },
      (err) => {
        this.msgr.error(err.message || 'Failed to get merchant types data.');
      }
    );
  }
  save() {
      this.store.dispatch(new UpdateMerchantDetail({
        userId: this.userId,
        merchantDetail: {
          ...this.dbaFormGroup.value,
          sectionField: 'dbaInfoStatus'
        }
      }));
  }
  @HostListener('window:resize', ['$event'])
  listenResize() {
    this.smallScreen = resize('sm') || resize('xs') || resize('md');
  }

  isFormValid(): boolean {
    const {
      businessId, applicationId,applicationIdkey, 
    } = this.dbaFormGroup.value;


    return true;
  }

  openDialog(): void {
    this.dialog.open(AddCommentDialogComponent, {
      data: {
        merchantId: this.userId,
        commentType: MERCHANT_COMMENT_TYPE.DBA,
        comments: this.comments
      }
    });
  }

  approveSection() {
    this.merchantApiService.approveSection(this.userId, 'dbaInfoStatus', true)
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
    this.merchantApiService.approveSection(this.userId, 'dbaInfoStatus', false)
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

