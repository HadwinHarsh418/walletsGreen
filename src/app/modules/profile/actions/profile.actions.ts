import { Action } from '@ngrx/store';

export enum ProfileActionTypes {
    UpdateProfile = '[User] Update Profile',
    UpdateProfileSuccess = '[User] Update Profile Success',
    UpdateProfileFailure = '[User] Update Profile Failure',
}

export class UpdateProfile implements Action {
    readonly type = ProfileActionTypes.UpdateProfile;
    constructor(public payload: any) { }
}

export class UpdateProfileSuccess implements Action {
    readonly type = ProfileActionTypes.UpdateProfileSuccess;
    constructor(public payload: any) {}
}

export class UpdateProfileFailure implements Action {
    readonly type = ProfileActionTypes.UpdateProfileFailure;
    constructor(public payload: string) {}
}

export type ProfileActions =
UpdateProfile |
UpdateProfileSuccess |
UpdateProfileFailure;

