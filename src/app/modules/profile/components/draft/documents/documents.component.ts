import { Component, OnInit, HostListener, ViewChild, ElementRef, Input } from '@angular/core';
import { resize, checkHeight } from "@root/utils/resize";
import { DocumentApiService } from '@services/document-api.service';
import { MerchantDetailService } from '@modules/profile/services/merchant-detail.service';
import { MessengerService } from '@modules/messenger/messenger.service';
import { DownloadDocument, UpdateMerchantDetail, UpdateMerchantDetailSuccess } from '@modules/profile/actions/merchant-detail.actions';
import { select, Store } from '@ngrx/store';
import * as loginReducers from '@modules/login/reducers';
import { IDocument } from '@interfaces/document.interface';
import * as merchantReducers from '@modules/profile/reducers';
import {IMerchantComment} from '@interfaces/merchant-comment.interface';
import {AddCommentDialogComponent} from '@modules/profile/components/draft/add-comment-dialog/add-comment-dialog.component';
import {MERCHANT_COMMENT_TYPE} from '@root/resources/enums/merchant-comment-types.enum';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'edex-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

    @Input() userId: string;

    public smallScreen = false;
    public shortHeight = false;

    public idFile: File;
    public idDocument: IDocument;
    public addressFile: File;
    public addressDocument: IDocument;
    public taxFile: File;
    public taxDocument: IDocument;
    public comments: IMerchantComment[] = [];
    public status = '';

    public user$ = this.store.pipe(select(loginReducers.getUser));
    public merchantDetail$ = this.store.pipe(select(merchantReducers.getMerchantDetailCollection));
    public downloadPending$ = this.store.pipe(select(merchantReducers.getDownloadDocumentPending));

    @ViewChild('idFileInput') idFileInput: ElementRef<HTMLInputElement>;
    @ViewChild('addressFileInput') addressFileInput: ElementRef<HTMLInputElement>;
    @ViewChild('taxFileInput') taxFileInput: ElementRef<HTMLInputElement>;

    constructor(
        private store: Store<loginReducers.State>,
        private documentApiService: DocumentApiService,
        private merchantApiService: MerchantDetailService,
        private msgr: MessengerService,
        private dialog: MatDialog,
    ) {
        this.smallScreen = resize('sm') || resize('xs') || resize('md');
        this.shortHeight = checkHeight();
    }

    ngOnInit() {
        this.merchantDetail$.subscribe((merchantDetail) => {
            if (merchantDetail) {
                const { idDocument, taxDocument, addressDocument, kycInfoStatus } = merchantDetail;
                this.idDocument = idDocument;
                this.taxDocument = taxDocument;
                this.addressDocument = addressDocument;
                this.status = kycInfoStatus;

                if (merchantDetail.kycInfoComments) {
                    this.comments = merchantDetail.kycInfoComments;
                }
            }
        });
    }

    onFileChange(event: Event, fieldName: string): void {
        const {files} = event.target as HTMLInputElement;
        if (files.item(0)) {
            this[fieldName] = files.item(0);
        }
    }

    importFile(inputName: string): void {
        if (this[inputName] && this[inputName].nativeElement) {
            this[inputName].nativeElement.click();
        }
    }

    removeFile(fieldName: string) {
        this[fieldName] = null;
    }

    upload(fileField: string, field: string): void {
        const formData = new FormData();
        formData.append('document', this[fileField]);

        this.documentApiService.uploadDocument(formData).subscribe(
            (res) => {
                const document = {
                    fileName: res.fileName,
                    key: res.key
                };
                this.store.dispatch(new UpdateMerchantDetail({
                    userId: this.userId,
                    merchantDetail: {
                        [field]: document,
                        sectionField: 'kycInfoStatus'
                    }
                }));

                this[fileField] = null;
            },
            (err) => {
                this.msgr.error(err.message || 'Failed to upload the document.');
            }
        );
    }

    removeDoc(fieldName: string): void {
        this.store.dispatch(new UpdateMerchantDetail({
            userId: this.userId,
            merchantDetail: {
                [fieldName]: null
            }
        }));
    }

    download(document: string) {
        this.store.dispatch(new DownloadDocument(document));
    }

    approveSection() {
        this.merchantApiService.approveSection(this.userId, 'kycInfoStatus', true)
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
        this.merchantApiService.approveSection(this.userId, 'kycInfoStatus', false)
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

    openDialog(): void {
        this.dialog.open(AddCommentDialogComponent, {
            data: {
                merchantId: this.userId,
                commentType: MERCHANT_COMMENT_TYPE.KYC_INFO,
                comments: this.comments
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    listenResize() {
        this.smallScreen = resize('sm') || resize('xs') || resize('md');
        this.shortHeight = checkHeight();
    }
}
