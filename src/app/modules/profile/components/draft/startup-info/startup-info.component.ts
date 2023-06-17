import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {DownloadDocument, UpdateMerchantDetail, UpdateMerchantDetailSuccess} from '@modules/profile/actions/merchant-detail.actions';
import { select, Store } from '@ngrx/store';
import * as merchantReducers from '@modules/profile/reducers';
import { Subscription, zip } from 'rxjs';
import { IMerchantComment } from '@interfaces/merchant-comment.interface';
import { MatDialog } from '@angular/material';
import { AddCommentDialogComponent } from '@modules/profile/components/draft/add-comment-dialog/add-comment-dialog.component';
import { MERCHANT_COMMENT_TYPE } from '@root/resources/enums/merchant-comment-types.enum';
import { IDocument } from '@interfaces/document.interface';
import { MessengerService } from '@modules/messenger/messenger.service';
import { DocumentApiService } from '@services/document-api.service';
import {MerchantDetailService} from '@modules/profile/services/merchant-detail.service';
import * as loginReducers from '@modules/login/reducers';

@Component({
  selector: 'edex-startup-info',
  templateUrl: './startup-info.component.html',
  styleUrls: ['./startup-info.component.scss']
})
export class StartupInfoComponent implements OnInit, OnDestroy {
  private merchantDetailSub: Subscription;

  public financialProjectionFile: File;
  public businessPlanFile: File;
  public financialProjectionDoc: IDocument;
  public businessPlanFileDoc: IDocument;

  public updatePending$ = this.store.pipe(select(merchantReducers.getUpdateMerchantDetailPending));
  public downloadPending$ = this.store.pipe(select(merchantReducers.getDownloadDocumentPending));
  public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
  public user$ = this.store.pipe(select(loginReducers.getUser));
  public comments: IMerchantComment[] = [];
  public status = '';

  @Input() userId: string;

  @ViewChild('financialFileInput') financialFileInput: ElementRef<HTMLInputElement>;
  @ViewChild('businessPlanFileInput') businessPlanFileInput: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<merchantReducers.State>,
    private msgr: MessengerService,
    private documentApiService: DocumentApiService,
    private merchantApiService: MerchantDetailService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.merchantDetailSub = this.merchantDetail$.subscribe(merchantDetail => {
      if (merchantDetail) {
        this.financialProjectionDoc = merchantDetail.financialProjectionFile;
        this.businessPlanFileDoc = merchantDetail.businessPlanFile;
        this.status = merchantDetail.startupInfoStatus;

        if (merchantDetail.startUpInfoComments) {
          this.comments = merchantDetail.startUpInfoComments;
        }
      }
    });
  }

  onFinancialChange(event: Event): void {
    const { files } = event.target as HTMLInputElement;
    if (files.item(0)) { this.financialProjectionFile = files.item(0); }
  }

  importFinancial(): void {
    this.financialFileInput.nativeElement.click();
  }

  removeFinancial(): void {
    this.financialProjectionDoc = null;
  }

  removeFinancialFile(): void {
    this.financialProjectionFile = null;
  }

  onBusinessPlanChange(event: Event): void {
    const { files } = event.target as HTMLInputElement;
    if (files.item(0)) { this.businessPlanFile = files.item(0); }
  }

  importBusinessPlan(): void {
    this.businessPlanFileInput.nativeElement.click();
  }

  removeBusinessPlan(): void {
    this.businessPlanFileDoc = null;
  }

  removeBusinessPlanFile(): void {
    this.businessPlanFile = null;
  }

  save(): void {
    let financialProjectionFile = this.financialProjectionDoc;
    let businessPlanFile = this.businessPlanFileDoc;

    const actions = [];
    if (this.financialProjectionFile) {
      const formData = new FormData();
      formData.append('document', this.financialProjectionFile);
      actions.push(this.documentApiService.uploadDocument(formData));
    }
    if (this.businessPlanFile) {
      const formData = new FormData();
      formData.append('document', this.businessPlanFile);
      actions.push(this.documentApiService.uploadDocument(formData));
    }

    zip(...actions).subscribe(([financialFile, businessFile]: IDocument[]) => {
      financialProjectionFile = {
        fileName: financialFile.fileName,
        key: financialFile.key
      };
      businessPlanFile = {
        fileName: businessFile.fileName,
        key: businessFile.key
      };

      this.store.dispatch(new UpdateMerchantDetail({
        userId: this.userId,
        merchantDetail: {
          financialProjectionFile,
          businessPlanFile
        }
      }));
    }, (error) => {
      this.msgr.error(error.message || 'Failed to upload the document.');
    });
  }

  openDialog(): void {
    this.dialog.open(AddCommentDialogComponent, {
      data: {
        merchantId: this.userId,
        commentType: MERCHANT_COMMENT_TYPE.STARTUP_INFO,
        comments: this.comments
      }
    });
  }

  download(document: string) {
    this.store.dispatch(new DownloadDocument(document));
  }

  approveSection() {
    this.merchantApiService.approveSection(this.userId, 'startupInfoStatus', true)
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
    this.merchantApiService.approveSection(this.userId, 'startupInfoStatus', false)
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

  ngOnDestroy(): void {
    if (this.merchantDetailSub) {
      this.merchantDetailSub.unsubscribe();
    }
  }
}
