import { Action } from '@ngrx/store';

export enum NewPayeeActionTypes {
  NewPayee = '[NewPayee] New Payee',
  NewPayeeSuccess = '[NewPayee] New Payee Success',
  NewPayeeError = '[NewPayee] New Payee Error',
  ResetNewPayee = '[NewPayee] Reset New Payee'
}

export class NewPayee implements Action {
  readonly type = NewPayeeActionTypes.NewPayee;
  constructor(public payload: any) { }
}

export class NewPayeeSuccess implements Action {
  readonly type = NewPayeeActionTypes.NewPayeeSuccess;
  constructor(public payload: any) { }
}

export class NewPayeeError implements Action {
  readonly type = NewPayeeActionTypes.NewPayeeError;
  constructor(public payload: any) { }
}

export class ResetNewPayee implements Action {
  readonly type = NewPayeeActionTypes.ResetNewPayee;
}

export type NewPayeeActions = NewPayee | NewPayeeSuccess | NewPayeeError | ResetNewPayee;
