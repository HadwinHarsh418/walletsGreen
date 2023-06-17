import { Action } from '@ngrx/store';

export enum MerchantDetailActionTypes {
  GetMerchantDetail = '[Merchant] Get MerchantDetail',
  GetMerchantDetailSuccess = '[Merchant] Get MerchantDetail Success',
  GetMerchantDetailFailure = '[Merchant] Get MerchantDetail Failure',
  UpdateMerchantDetail = '[Merchant] Update MerchantDetail',
  UpdateMerchantDetailSuccess = '[Merchant] Update MerchantDetail Success',
  UpdateMerchantDetailFailure = '[Merchant] Update MerchantDetail Failure',
  UploadDocument = '[Merchant] Upload Document',
  UploadDocumentSuccess = '[Merchant] Upload Document Success',
  UploadDocumentFailure = '[Merchant] Upload Document Failure',
  DownloadDocument = '[Merchant] Download Document',
  DownloadDocumentSuccess = '[Merchant] Download Document Success',
  DownloadDocumentFailure = '[Merchant] Download Document Failure',
}

export class GetMerchantDetail implements Action {
  readonly type = MerchantDetailActionTypes.GetMerchantDetail;
  constructor(public payload: any) {}
}

export class GetMerchantDetailSuccess implements Action {
  readonly type = MerchantDetailActionTypes.GetMerchantDetailSuccess;
  constructor(public payload: any) {}
}

export class GetMerchantDetailFailure implements Action {
  readonly type = MerchantDetailActionTypes.GetMerchantDetailFailure;
  constructor(public payload: any) {}
}

export class UpdateMerchantDetail implements Action {
  readonly type = MerchantDetailActionTypes.UpdateMerchantDetail;
  constructor(public payload: any) {}
}

export class UpdateMerchantDetailSuccess implements Action {
  readonly type = MerchantDetailActionTypes.UpdateMerchantDetailSuccess;
  constructor(public payload: any) {}
}

export class UpdateMerchantDetailFailure implements Action {
  readonly type = MerchantDetailActionTypes.UpdateMerchantDetailFailure;
  constructor(public payload: any) {}
}

export class UploadDocument implements Action {
  readonly type = MerchantDetailActionTypes.UploadDocument;
  constructor(public payload: any) {
  }
}

export class UploadDocumentSuccess implements Action {
  readonly type = MerchantDetailActionTypes.UploadDocumentSuccess;
  constructor(public payload: any) {
  }
}

export class UploadDocumentFailure implements Action {
  readonly type = MerchantDetailActionTypes.UploadDocumentFailure;
  constructor(public payload: any) {
  }
}

export class DownloadDocument implements Action {
  readonly type = MerchantDetailActionTypes.DownloadDocument;
  constructor(public payload: any) {
  }
}

export class DownloadDocumentSuccess implements Action {
  readonly type = MerchantDetailActionTypes.DownloadDocumentSuccess;
  constructor(public payload: any) {
  }
}

export class DownloadDocumentFailure implements Action {
  readonly type = MerchantDetailActionTypes.DownloadDocumentFailure;
  constructor(public payload: any) {
  }
}

export type MerchantDetailActions =
  GetMerchantDetail |
  GetMerchantDetailSuccess |
  GetMerchantDetailFailure |
  UpdateMerchantDetail |
  UpdateMerchantDetailSuccess |
  UpdateMerchantDetailFailure |
  UploadDocument |
  UploadDocumentSuccess |
  UploadDocumentFailure |
  DownloadDocument |
  DownloadDocumentSuccess |
  DownloadDocumentFailure;
