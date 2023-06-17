import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';

import { environment } from '@environments/environment';
import * as fromProfile from './profile.reducer';
import * as merchantDetail from './merchant-detail.reducer';

export interface State {
    update: fromProfile.State;
    merchantDetail: merchantDetail.State;
}

export const reducers: ActionReducerMap<State> = {
    update: fromProfile.reducer,
    merchantDetail: merchantDetail.reducer
};



export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


export const selectProfileState = createFeatureSelector<State>('update');
export const selectProfile = createSelector(selectProfileState, state => state.update);
export const getProfileCollection = createSelector(selectProfile, fromProfile.getCollection);
export const getProfilePending = createSelector(selectProfile, fromProfile.getPending);
export const getProfileError = createSelector(selectProfile, fromProfile.getError);


export const selectMerchantDetailState = createFeatureSelector<State>('update');
export const selectMerchantDetail = createSelector(selectMerchantDetailState, state => state.merchantDetail);
export const getMerchantDetailCollection = createSelector(selectMerchantDetail, merchantDetail.getCollection);
export const getUpdateMerchantDetailPending = createSelector(selectMerchantDetail, merchantDetail.getUpdatePending);
export const getUpdateMerchantDetailError = createSelector(selectMerchantDetail, merchantDetail.getUpdateError);
export const getUpdateMerchantDetailSuccess = createSelector(selectMerchantDetail, merchantDetail.getUpdateSuccess);
export const getGetMerchantDetailPending = createSelector(selectMerchantDetail, merchantDetail.getCollectionPending);
export const getGetMerchantDetailSuccess = createSelector(selectMerchantDetail, merchantDetail.getCollectionSuccess);
export const getGetMerchantDetailError = createSelector(selectMerchantDetail, merchantDetail.getCollectionError);
export const getUploadDocumentPending = createSelector(selectMerchantDetail, merchantDetail.getUpdatePending);
export const getUploadDocumentError = createSelector(selectMerchantDetail, merchantDetail.getUploadDocumentError);
export const getUploadDocumentSuccess = createSelector(selectMerchantDetail, merchantDetail.getUploadDocumentSuccess);
export const getDownloadDocumentPending = createSelector(selectMerchantDetail, merchantDetail.getDownloadDocumentPending);
export const getDownloadDocumentSuccess = createSelector(selectMerchantDetail, merchantDetail.getDownloadDocumentSuccess);
export const getDownloadDocumentError = createSelector(selectMerchantDetail, merchantDetail.getDownloadDocumentError);
