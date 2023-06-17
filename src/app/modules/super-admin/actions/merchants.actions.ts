import { Action } from '@ngrx/store';

export enum MerchantsActionTypes {
  GetAllMerchants = '[Merchants] Get GetAllMerchants',
  GetAllMerchantsSuccess = '[Merchants] Get AllMerchants Success',
  GetAllMerchantsFailure = '[Merchants] Get AllMerchants Failure',
}

export class GetAllMerchants implements Action {
  readonly type = MerchantsActionTypes.GetAllMerchants;
  constructor(public payload: any) {}
}

export class GetAllMerchantsSuccess implements Action {
  readonly type = MerchantsActionTypes.GetAllMerchantsSuccess;
  constructor(public payload: any) {}
}

export class GetAllMerchantsFailure implements Action {
  readonly type = MerchantsActionTypes.GetAllMerchantsFailure;
  constructor(public payload: any) {}
}

export type MerchantsActions =
  GetAllMerchants |
  GetAllMerchantsSuccess |
  GetAllMerchantsFailure;
