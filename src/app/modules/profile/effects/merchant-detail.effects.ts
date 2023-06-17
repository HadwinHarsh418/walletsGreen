import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import { MerchantDetailService } from '@modules/profile/services/merchant-detail.service';
import {
  MerchantDetailActionTypes,
  UpdateMerchantDetail,
  UpdateMerchantDetailSuccess,
  UpdateMerchantDetailFailure,
  UploadDocument,
  GetMerchantDetail,
  GetMerchantDetailSuccess,
  GetMerchantDetailFailure,
  UploadDocumentSuccess,
  UploadDocumentFailure,
  DownloadDocument,
  DownloadDocumentSuccess,
  DownloadDocumentFailure,
} from '@modules/profile/actions/merchant-detail.actions';
import { MessengerService } from '@modules/messenger/messenger.service';
import { DocumentApiService } from '@services/document-api.service';
import { saveAs } from 'file-saver';

@Injectable()
export class MerchantDetailEffects {

  @Effect()
  update$ = this.actions$.pipe(
    ofType<UpdateMerchantDetail>(MerchantDetailActionTypes.UpdateMerchantDetail),
    exhaustMap(action =>
      this.service.updateMerchantDetail(action.payload.userId, action.payload.merchantDetail).pipe(
        switchMap(result => {
          this.msgr.message('The merchant is updated successfully!');

          return [
            new UpdateMerchantDetailSuccess(result)
          ];
        }),
        catchError(error => {
          this.msgr.error(error);

          return of(new UpdateMerchantDetailFailure(error));
        })
      )
    )
  );

  @Effect()
  get$ = this.actions$.pipe(
    ofType<GetMerchantDetail>(MerchantDetailActionTypes.GetMerchantDetail),
    exhaustMap(action =>
      this.service.getMerchantDetail(action.payload.userId).pipe(
        switchMap(result => {
          return [
            new GetMerchantDetailSuccess(result)
          ];
        }),
        catchError(error => {
          this.msgr.error(error);

          return of(new GetMerchantDetailFailure(error));
        })
      )
    )
  );

  @Effect()
  upload$ = this.actions$.pipe(
    ofType<UploadDocument>(MerchantDetailActionTypes.UploadDocument),
    exhaustMap(action =>
      this.documentApiService.uploadDocument(action.payload).pipe(
        switchMap(result => {
          this.msgr.message('Uploaded document successfully!');

          return [
            new UploadDocumentSuccess(result)
          ];
        }),
        catchError(error => {
          this.msgr.error(error);

          return of(new UploadDocumentFailure(error));
        })
      )
    )
  );

  @Effect()
  download$ = this.actions$.pipe(
    ofType<DownloadDocument>(MerchantDetailActionTypes.DownloadDocument),
    exhaustMap(action =>
      this.documentApiService.downloadDocument(action.payload).pipe(
        switchMap((result: any) => {
          saveAs(new Blob([new Uint8Array(result.file.data)]), action.payload);
          return [
            new DownloadDocumentSuccess({})
          ];
        }),
        catchError(error => {
          this.msgr.error('Download Error!');

          return of(new DownloadDocumentFailure(error));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: MerchantDetailService,
    private documentApiService: DocumentApiService,
    private msgr: MessengerService
  ) {
  }
}
