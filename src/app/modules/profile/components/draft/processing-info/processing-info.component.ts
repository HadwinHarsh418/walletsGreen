import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as loginReducers from '@modules/login/reducers';
import * as merchantReducers from '../../../reducers';
import { DownloadDocument, UpdateMerchantDetail, UpdateMerchantDetailSuccess } from '@modules/profile/actions/merchant-detail.actions';
import { Subscription } from 'rxjs';
import { isDefined } from '@angular/compiler/src/util';
import * as ProcessStatements from '@modules/login/components/processStatements';

import { IMerchantComment } from '@interfaces/merchant-comment.interface';
import { MatDialog } from '@angular/material';
import { AddCommentDialogComponent } from '@modules/profile/components/draft/add-comment-dialog/add-comment-dialog.component';
import { MERCHANT_COMMENT_TYPE } from '@root/resources/enums/merchant-comment-types.enum';
import { MerchantDetailService } from '@modules/profile/services/merchant-detail.service';
import { MessengerService } from '@modules/messenger/messenger.service';
import { IDocument } from '@interfaces/document.interface';
import { DocumentApiService } from '@services/document-api.service';
import { isSetInput } from '@modules/login/services/utils';

@Component({
  selector: 'edex-processing-info',
  templateUrl: './processing-info.component.html',
  styleUrls: ['./processing-info.component.scss']
})
export class ProcessingInfoComponent implements OnInit, OnDestroy {
  private merChantSubscription: Subscription;

  @Input() userId: string;
  public processStatement = ProcessStatements.slim_2;
  public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
  public downloadPending$ = this.store.pipe(select(merchantReducers.getDownloadDocumentPending));
  public uploadPending$ = this.store.pipe(select(merchantReducers.getUploadDocumentPending));
  public updatePending$ = this.store.pipe(select(merchantReducers.getUpdateMerchantDetailPending));
  public user$ = this.store.pipe(select(loginReducers.getUser));
  public processFormGroup: FormGroup;
  public submitted = false;
  public comments: IMerchantComment[] = [];
  public processingStatementFiles: IDocument[] = [];
  public files: File[] = [];
  public status = '';

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<loginReducers.State>,
    private fb: FormBuilder,
    private documentApiService: DocumentApiService,
    private merchantApiService: MerchantDetailService,
    private msgr: MessengerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.processFormGroup = this.fb.group({
      transactionsMonthlyVolume: [null],
      // transactionsMonthlyVolume: [null, [Validators.required]],
      transactionsAvgAmount: [null],
      transactionsHighestValue: [null],
      seasonalMerchant: [true, []],
      processingInfoComment: [null, []],
     // processingSales: ['NA', [Validators.pattern(/^0|1$/)]],
      NDF: ['NA'],
      currentProcessor: [null, []],
      retailChipSwipe: [null, []],
      imprintCard: [null, []],
      internet: [null, []],
      ebtFns: [null, []],
      processingStatement: ['NA'],
    });

    this.merChantSubscription = this.merchantDetail$.subscribe((merchantDetail) => {
      if (merchantDetail) {
        const {
          transactionsMonthlyVolume, transactionsAvgAmount, transactionsHighestValue, seasonalMerchant,
          processingInfoComments, processingStatementFiles, processingStatement, processingInfoStatus,
          //processingSales,
          NDF,currentProcessor, retailChipSwipe,imprintCard,  internet,
            ebtFns, 
        } = merchantDetail;
        this.status = processingInfoStatus;
        let processStatementObj;
        if(processingStatement){
          processStatementObj =  this.processStatement.find(i => i.name == processingStatement);
        }else{
          processStatementObj = '';
        }
        this.processingStatementFiles = processingStatementFiles;
        this.user$.subscribe((user)=>{
          if(user){
            if(user.role != 'Merchant'){
              this.processFormGroup.patchValue({
                transactionsMonthlyVolume:'',
                transactionsAvgAmount:'',
                transactionsHighestValue: '',
                seasonalMerchant: '',
                processingStatement: '',
            //    processingSales: '',
                NDF: '',
                currentProcessor:'', 
                retailChipSwipe:'',
                imprintCard:'', 
                internet: '',
                ebtFns: '', 
             });
             this.processFormGroup.patchValue({
                transactionsMonthlyVolume,
               transactionsAvgAmount,
               transactionsHighestValue,
                seasonalMerchant,
               processingStatement: processStatementObj,
             //  processingSales,
               NDF,
              currentProcessor, 
              retailChipSwipe,
              imprintCard, 
              internet,
              ebtFns, 
           });
            }
          }
        })
        this.processFormGroup.patchValue({
          transactionsMonthlyVolume,
         transactionsAvgAmount,
         transactionsHighestValue,
          seasonalMerchant,
         processingStatement: processStatementObj,
       //  processingSales,
         NDF,
        currentProcessor, 
        retailChipSwipe,
        imprintCard, 
        internet,
        ebtFns, 
     });
      //   this.processFormGroup.patchValue({
      //     transactionsMonthlyVolume: isSetInput(this.processFormGroup.get('transactionsMonthlyVolume'), transactionsMonthlyVolume),
      //     transactionsAvgAmount: isSetInput(this.processFormGroup.get('transactionsAvgAmount'), transactionsAvgAmount),
      //     transactionsHighestValue: isSetInput(this.processFormGroup.get('transactionsHighestValue'), transactionsHighestValue),
      //     seasonalMerchant: isSetInput(this.processFormGroup.get('seasonalMerchant'), seasonalMerchant),
      //     processingStatement:  processStatementObj,
      //  //   processingSales: isSetInput(this.processFormGroup.get('processingSales'), processingSales),
      //     NDF: isSetInput(this.processFormGroup.get('NDF'), NDF),
      //     currentProcessor: isSetInput(this.processFormGroup.get('currentProcessor'), currentProcessor), 
      //     retailChipSwipe: isSetInput(this.processFormGroup.get('retailChipSwipe'), retailChipSwipe),
      //     imprintCard: isSetInput(this.processFormGroup.get('imprintCard'), imprintCard), 
      //     internet: isSetInput(this.processFormGroup.get('internet'), internet),
      //     ebtFns: isSetInput(this.processFormGroup.get('ebtFns'), ebtFns), 
      //  });
  
        
        this.submitted = 
        isDefined(transactionsMonthlyVolume) || 
        isDefined(transactionsAvgAmount) || 
        isDefined(transactionsHighestValue) || 
        isDefined(seasonalMerchant) || 
        isDefined(processingInfoComments) || 
        isDefined(processingStatementFiles) || 
        isDefined(processingStatement) || 
        isDefined(processingInfoStatus) || 
        isDefined(NDF) || 
        isDefined(currentProcessor) || 
        isDefined(retailChipSwipe) || 
        isDefined(imprintCard) || 
        isDefined(ebtFns) || 
        isDefined(internet);

        if (processingInfoComments) {
          this.comments = processingInfoComments;
        }
      }
    });
  }

  onFileChange(event: Event): void {
    const {files} = event.target as HTMLInputElement;
    if (files.item(0)) {
      console.log(files.item(0),"files.item(0)")
      const formData = new FormData();
    formData.append('document', files.item(0));

    this.documentApiService.uploadDocument(formData).subscribe(
      (res) => {
        const newProcessingStatementFile = {
          fileName: res.fileName,
          key: res.key
        };
        this.processingStatementFiles.push(newProcessingStatementFile);
        // this.store.dispatch(new UpdateMerchantDetail({
        //   userId: this.userId,
        //   merchantDetail: {
        //     processingStatementFiles: this.processingStatementFiles,
        //     sectionField: 'processingInfoStatus'
        //   }
        // }));

        this.removeFile(files.item(0));
      },
      (err) => {
        this.msgr.error(err.message || 'Failed to upload the document.');
      }
    );
      this.files.push(files.item(0));
    }
  }

  importFile(): void {
    this.fileInput.nativeElement.click();
  }

  removeFile(file): void {
    this.files = this.files.filter(item => item !== file);
  }

  removeProcessingStatementFile(key): void {
    this.processingStatementFiles = this.processingStatementFiles.filter(doc => doc.key !== key);
    // this.store.dispatch(new UpdateMerchantDetail({
    //   userId: this.userId,
    //   merchantDetail: {
    //     processingStatementFiles: this.processingStatementFiles
    //   }
    // }));
  }

  save(file): void {
    const formData = new FormData();
    formData.append('document', file);

    this.documentApiService.uploadDocument(formData).subscribe(
      (res) => {
        const newProcessingStatementFile = {
          fileName: res.fileName,
          key: res.key
        };
        this.processingStatementFiles.push(newProcessingStatementFile);
        // this.store.dispatch(new UpdateMerchantDetail({
        //   userId: this.userId,
        //   merchantDetail: {
        //     processingStatementFiles: this.processingStatementFiles,
        //     sectionField: 'processingInfoStatus'
        //   }
        // }));

        this.removeFile(file);
      },
      (err) => {
        this.msgr.error(err.message || 'Failed to upload the document.');
      }
    );
  }

  submit() {
    if (!this.processFormGroup.valid) {
      return;
    }

    this.store.dispatch(new UpdateMerchantDetail({
      userId: this.userId,
      merchantDetail: {
        transactionsMonthlyVolume: this.processFormGroup.controls['transactionsMonthlyVolume'].value,
          transactionsAvgAmount: this.processFormGroup.controls['transactionsAvgAmount'].value,
          transactionsHighestValue: this.processFormGroup.controls['transactionsHighestValue'].value,
          seasonalMerchant: this.processFormGroup.controls['seasonalMerchant'].value,
          NDF: this.processFormGroup.controls['NDF'].value,
          currentProcessor: this.processFormGroup.controls['currentProcessor'].value, 
          retailChipSwipe: this.processFormGroup.controls['retailChipSwipe'].value,
          imprintCard: this.processFormGroup.controls['imprintCard'].value, 
          internet: this.processFormGroup.controls['internet'].value,
          ebtFns: this.processFormGroup.controls['ebtFns'].value, 
        processingStatement: this.processFormGroup.controls['processingStatement'].value.name || '',
            processingStatementFiles: this.processingStatementFiles,

        sectionField: 'processingInfoStatus'
      }
    }));
  }

  download(document: string) {
    this.store.dispatch(new DownloadDocument(document));
  }

  openDialog(): void {
    this.dialog.open(AddCommentDialogComponent, {
      data: {
        merchantId: this.userId,
        commentType: MERCHANT_COMMENT_TYPE.PROCESSING_INFO,
        comments: this.comments
      }
    });
  }

  approveSection() {
    this.merchantApiService.approveSection(this.userId, 'processingInfoStatus', true)
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
    this.merchantApiService.approveSection(this.userId, 'processingInfoStatus', false)
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
    if (this.merChantSubscription) {
      this.merChantSubscription.unsubscribe();
    }
  }
}
