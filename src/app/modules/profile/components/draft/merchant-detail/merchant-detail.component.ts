import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { GetMerchantDetail, UpdateMerchantDetailSuccess } from '@modules/profile/actions/merchant-detail.actions';
import { select, Store } from '@ngrx/store';
import {
  DownloadDocument,
  UpdateMerchantDetail,
} from '@modules/profile/actions/merchant-detail.actions';
import * as merchantReducers from '@modules/profile/reducers';
import { MerchantDetailInterface } from '@interfaces/merchant-detail.interface';
import { isDefined } from '@angular/compiler/src/util';
import { Subscription } from 'rxjs';
import { MerchantDetailService } from '@modules/profile/services/merchant-detail.service';
import { MessengerService } from '@modules/messenger/messenger.service';
import { isSetInput } from '@modules/login/services/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as loginReducers from '@modules/login/reducers';
import { UpdateUserService } from '@modules/profile/services/update-user.service';

@Component({
  selector: 'edex-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.scss']
})
export class MerchantDetailComponent implements OnInit, OnDestroy {

  private merchantDetailSub: Subscription;
  public offerFormGroup: FormGroup;
  public paymentFormGroup: FormGroup;

  public personalInfoCompleted = false;
  public additionalInfoCompleted = false;
  public startUpInfoCompleted = false;
  public processInfoCompleted = false;
  public kycInfoCompleted = false;
  public siteInspectionCompleted = false;
  public sourceOfSaleCompleted = false;
  public communicationCompleted = false;
  public taxInfoCompleted = false;
  public bankInfoCompleted = false;
  public dbaInfoCompleted = false;
  public productInfoCompleted = false;
  public visibleAPIKEY = false;
  public visibleSecretKEY = false;
  public offerCode = false;

  public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
  public merchantDetailInfo;
  public user$ = this.store.pipe(select(loginReducers.getUser));
  public user;
  public userType = '';

  @Input() userId: string;
  @Input() showUserInfo: boolean;

  constructor(
    private store: Store<merchantReducers.State>,
    private merchantApiService: MerchantDetailService,
    private msgr: MessengerService,
    private fb: FormBuilder,
    private userService: UpdateUserService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "unicorn",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../../assets/img/icon.svg")
    );

  }

  ngOnInit() {
    this.store.dispatch(new GetMerchantDetail({ userId: this.userId }));
    this.offerFormGroup = this.fb.group({
      offerCode: [''],
    });
    this.paymentFormGroup = this.fb.group({
      paymentProcessor: ['', [Validators.required]],
    });
    this.merchantDetailSub = this.merchantDetail$.subscribe(merchantDetail => {


      if (merchantDetail) {
        this.merchantDetailInfo = merchantDetail;
        if (merchantDetail.merchant) {
          this.userType = merchantDetail.merchant.role;
        }
        console.log(this.merchantDetailInfo);

        console.log(merchantDetail, "merchantDetail.doesInsideMatchGoodSold");

        const offerCode = merchantDetail.merchant.offerCode;
        const paymentProcessor = merchantDetail.merchant.paymentProcessor || merchantDetail.paymentProcessor;
        console.log(merchantDetail.merchant, "merchantDetail.merchant");
        this.paymentFormGroup.patchValue({
          paymentProcessor,
        }
        );
        this.paymentFormGroup.patchValue({
          paymentProcessor: isSetInput(this.paymentFormGroup.get('paymentProcessor'), paymentProcessor),

        }
        );

        this.offerFormGroup.patchValue({
          offerCode,
        }
        );
        this.offerFormGroup.patchValue({
          offerCode: isSetInput(this.offerFormGroup.get('offerCode'), offerCode),

        }
        );
        this.personalInfoCompleted = this.checkPersonalInfoCompleted(merchantDetail);
        this.processInfoCompleted = this.checkProcessInfoCompleted(merchantDetail);
        this.taxInfoCompleted = this.checkTaxInfoCompleted(merchantDetail);
        this.bankInfoCompleted = this.checkBankInfoCompleted(merchantDetail);
        this.productInfoCompleted = this.checkProductInfoCompleted(merchantDetail);
        this.additionalInfoCompleted = this.checkAdditionalInfoCompleted(merchantDetail);
        this.startUpInfoCompleted = this.checkStartupInfoCompleted(merchantDetail);
        this.kycInfoCompleted = this.checkKYCInfoCompleted(merchantDetail);
        this.siteInspectionCompleted = this.checkSiteInspection(merchantDetail);
        this.dbaInfoCompleted = this.checkDbaInfoCompleted(merchantDetail);
        this.sourceOfSaleCompleted = this.checkSourceOfSale(merchantDetail);
        this.communicationCompleted = this.checkCommunicationCompleted(merchantDetail);
      }
    });

    this.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user)
    });
  }

  checkPersonalInfoCompleted(merchantDetail: MerchantDetailInterface): boolean {
    return isDefined(merchantDetail.firstname) &&
      isDefined(merchantDetail.lastname) &&
      isDefined(merchantDetail.country) &&
      isDefined(merchantDetail.countryCode) &&
      isDefined(merchantDetail.postalCode) &&
      isDefined(merchantDetail.personalInfoStatus);
  }
  checkSourceOfSale(merchantDetail: MerchantDetailInterface): boolean {
    return isDefined(merchantDetail.B2B) &&
      isDefined(merchantDetail.B2C) &&
      isDefined(merchantDetail.B2G);
  }
  checkDbaInfoCompleted(merchantDetail: MerchantDetailInterface): boolean {
    return isDefined(merchantDetail.merchant.businessId) &&
      isDefined(merchantDetail.merchant.applicationId) &&
      isDefined(merchantDetail.merchant.applicationIdkey);
  }
  checkProcessInfoCompleted(merchantDetail: MerchantDetailInterface): boolean {
    return isDefined(merchantDetail.transactionsMonthlyVolume) &&
      isDefined(merchantDetail.transactionsAvgAmount) &&
      isDefined(merchantDetail.transactionsHighestValue) &&
      isDefined(merchantDetail.seasonalMerchant) &&
      // isDefined(merchantDetail.processingSales) &&
      isDefined(merchantDetail.NDF) &&
      isDefined(merchantDetail.currentProcessor) &&
      isDefined(merchantDetail.retailChipSwipe) &&
      isDefined(merchantDetail.imprintCard) &&
      isDefined(merchantDetail.internet) &&
      isDefined(merchantDetail.ebtFns) &&
      isDefined(merchantDetail.emailAsMerchant) &&
      isDefined(merchantDetail.emailAsAdmin) &&
      isDefined(merchantDetail.processingStatement);
  }
  checkCommunicationCompleted(merchantDetail: MerchantDetailInterface): boolean {
    return isDefined(merchantDetail.emailAsMerchant) &&
      isDefined(merchantDetail.emailAsAdmin);
  }
  checkTaxInfoCompleted(merchantDetail: MerchantDetailInterface): boolean {
    return isDefined(merchantDetail.federalTaxID) &&
      isDefined(merchantDetail.abilityToUploadDocuments) &&
      isDefined(merchantDetail.stateTaxID);
  }

  checkBankInfoCompleted(merchantDetail: MerchantDetailInterface): boolean {
    return isDefined(merchantDetail.bankName) &&
      isDefined(merchantDetail.bankAccountName) &&
      isDefined(merchantDetail.bankCheckingAccount) &&
      isDefined(merchantDetail.bankRouting) &&
      isDefined(merchantDetail.bankProcessingStatement);
  }

  checkProductInfoCompleted(merchantDetail: MerchantDetailInterface): boolean {
    const { salesInitiatedByFF, salesInitiatedByOL, salesInitiatedByEM, salesInitiatedByPH, salesInitiatedBySC,
      productInfoStatus, productDeliver, productObligations, productDescription,
      refundPolicy, dropShipping, dropShippingPerc } = merchantDetail;



    return isDefined(salesInitiatedByFF) &&
      isDefined(salesInitiatedByOL) &&
      isDefined(salesInitiatedByEM) &&
      isDefined(salesInitiatedByPH) &&
      isDefined(salesInitiatedBySC) &&
      isDefined(productInfoStatus) &&
      isDefined(productDeliver) &&
      isDefined(productObligations) &&
      isDefined(productDescription) &&
      isDefined(refundPolicy) &&
      isDefined(dropShipping) &&
      isDefined(dropShippingPerc);
  }

  approveMerchant() {
    this.merchantApiService.approveMerchant(this.userId).subscribe(
      (res) => {
        this.store.dispatch(new UpdateMerchantDetailSuccess(res));
        this.msgr.message('The merchant is approved successfully.');
      },
      (err) => {
        this.msgr.error(err.message || 'Failed to approve merchant.');
      }
    );
  }
  saveMerchant() {
    this.store.dispatch(new UpdateMerchantDetail({
      userId: this.userId,
      merchantDetail: {
        ...this.offerFormGroup.value,
        sectionField: 'additionalInfoStatus'
      }
    }));
  }

  savePayment() {
    if(this.paymentFormGroup.invalid) {
      return;
    }
    this.store.dispatch(new UpdateMerchantDetail({
      userId: this.userId,
      merchantDetail: {
        ...this.paymentFormGroup.value,
        sectionField: 'additionalInfoStatus'
      }
    }));
  }
  checkAdditionalInfoCompleted(merchantDetail: MerchantDetailInterface): boolean {
    const {
      registeredCompanyName, tradingName, mainBusinessActivity, secondaryBusinessActivity,
      companyRegisteredNumber, MCC, companyType, yearsInBusiness, websiteUrl, registeredBusinessAddress,
      businessAddressZipcode, registeredTradingAddress, tradingAddressZipcode, companyDocs
    } = merchantDetail;
    const einNumber = merchantDetail.merchant;
    return isDefined(registeredCompanyName) && isDefined(tradingName) && isDefined(mainBusinessActivity) &&
      isDefined(secondaryBusinessActivity) && isDefined(companyRegisteredNumber) && isDefined(companyType) &&
      isDefined(yearsInBusiness) && isDefined(einNumber) && isDefined(MCC) && isDefined(websiteUrl) && isDefined(registeredBusinessAddress) && isDefined(businessAddressZipcode) &&
      isDefined(registeredTradingAddress) && isDefined(tradingAddressZipcode) && isDefined(companyDocs);
  }

  checkStartupInfoCompleted(merchantDetail: MerchantDetailInterface): boolean {
    const { financialProjectionFile, businessPlanFile } = merchantDetail;

    return isDefined(financialProjectionFile) && isDefined(businessPlanFile);
  }

  checkKYCInfoCompleted(merchantDetail: MerchantDetailInterface): boolean {
    return isDefined(merchantDetail.idDocument) &&
      isDefined(merchantDetail.addressDocument) &&
      isDefined(merchantDetail.taxDocument);
  }
  checkSiteInspection(merchantDetail: MerchantDetailInterface): boolean {
    return isDefined(merchantDetail.merchantProperty) &&
      isDefined(merchantDetail.area) &&
      isDefined(merchantDetail.zoneType) &&
      isDefined(merchantDetail.locationOfInventionary) &&
      isDefined(merchantDetail.inventonaryConsistent) &&
      isDefined(merchantDetail.locationSurvey) &&
      isDefined(merchantDetail.doesInsideMatchGoodSold);
  }
  assessSection(field: string) {
    if (this.user && (this.user.role === 'Admin' || this.user.role === 'SuperAdmin')) {
      if (this.merchantDetailInfo && this.merchantDetailInfo[field] === 'pending') {
        this.merchantApiService.assessingSection(this.userId, field)
          .subscribe(
            (res) => {
              this.store.dispatch(new UpdateMerchantDetailSuccess(res));
            },
            (err) => {
              this.msgr.error(err.message);
            }
          );
      }
    }

  }

  showSecretKey() {
    this.visibleSecretKEY = true;
  }

  hideSecretKey() {
    this.visibleSecretKEY = false;
  }
  editOfferCode() {
    this.offerCode = true;
  }
  blockOfferCode() {
    this.offerCode = false;
  }

  showAPIKey() {
    this.visibleAPIKEY = true;
  }

  hideAPIKey() {
    this.visibleAPIKEY = false;
  }

  updateAPIKey() {
    this.userService.updateApiKey(this.userId)
      .subscribe(
        () => {
          this.msgr.message('API key is updated successfully.');
          this.store.dispatch(new GetMerchantDetail({ userId: this.userId }));
        },
        (err) => {
          this.msgr.error(err.message);
        }
      );
  }

  updateSecretKey() {
    this.userService.updateSecretKey(this.userId)
      .subscribe(
        () => {
          this.msgr.message('Secret key is updated successfully.');
          this.store.dispatch(new GetMerchantDetail({ userId: this.userId }));
        },
        (err) => {
          this.msgr.error(err.message);
        }
      );
  }

  ngOnDestroy() {
    if (this.merchantDetailSub) {
      this.merchantDetailSub.unsubscribe();
    }
  }
}
