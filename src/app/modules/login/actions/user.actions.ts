import { Action } from '@ngrx/store';
import { User } from '@root/modules/login/interfaces/user.interface';

export enum UserActionTypes {
    GetUserSuccess = '[User] Get User Success',
    UpdateUserSuccess = '[User] Update User Success'
}

export class GetUserSuccess implements Action {
    readonly type = UserActionTypes.GetUserSuccess;
    constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
    readonly type = UserActionTypes.UpdateUserSuccess;
    constructor(public payload: any) {}
}


export type UserActions =
GetUserSuccess |
  UpdateUserSuccess;
