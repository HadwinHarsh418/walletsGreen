import {MerchantDetailInterface} from '@interfaces/merchant-detail.interface';
import {MerchantDetailActions, MerchantDetailActionTypes} from '@modules/profile/actions/merchant-detail.actions';

export interface State {
  collection: MerchantDetailInterface;
  getCollectionPending: boolean;
  getCollectionError: string | boolean;
  getCollectionSuccess: boolean;
  updatePending: boolean;
  updateError: string | boolean;
  updateSuccess: boolean;
  uploadDocumentPending: boolean;
  uploadDocumentError: string | boolean;
  uploadDocumentSuccess: boolean;
  downloadDocumentPending: boolean;
  downloadDocumentError: string | boolean;
  downloadDocumentSuccess: boolean;
}

export const initialState: State = {
  collection: null,
  getCollectionPending: false,
  getCollectionError: false,
  getCollectionSuccess: false,
  updatePending: false,
  updateError: false,
  updateSuccess: false,
  uploadDocumentPending: false,
  uploadDocumentError: false,
  uploadDocumentSuccess: false,
  downloadDocumentPending: false,
  downloadDocumentSuccess: false,
  downloadDocumentError: false,
};

export function reducer(state = initialState, action: MerchantDetailActions): State {
  switch (action.type) {
    case MerchantDetailActionTypes.GetMerchantDetail: {
      return {
        ...state,
        getCollectionPending: true,
        getCollectionError: false,
        getCollectionSuccess: false,
      };
    }

    case MerchantDetailActionTypes.GetMerchantDetailSuccess: {
      return  {
        ...state,
        collection: action.payload,
        getCollectionPending: false,
        getCollectionError: false,
        getCollectionSuccess: true,
      };
    }

    case MerchantDetailActionTypes.GetMerchantDetailFailure: {
      return {
        ...state,
        getCollectionPending: false,
        getCollectionError: action.payload,
        getCollectionSuccess: false
      };
    }

    case MerchantDetailActionTypes.UpdateMerchantDetail: {
      return {
        ...state,
        updatePending: true,
        updateError: false,
        updateSuccess: false,
      };
    }

    case MerchantDetailActionTypes.UpdateMerchantDetailSuccess: {
      return  {
        ...state,
        collection: action.payload,
        updatePending: false,
        updateError: false,
        updateSuccess: true,
      };
    }

    case MerchantDetailActionTypes.UpdateMerchantDetailFailure: {
      return {
        ...state,
        updatePending: false,
        updateSuccess: false,
        updateError: action.payload
      };
    }

    case MerchantDetailActionTypes.UploadDocument: {
      return {
        ...state,
        uploadDocumentPending: true,
        uploadDocumentError: false,
        uploadDocumentSuccess: false,
      };
    }

    case MerchantDetailActionTypes.UploadDocumentSuccess: {
      return {
        ...state,
        uploadDocumentPending: false,
        uploadDocumentError: false,
        uploadDocumentSuccess: true,
      };
    }

    case MerchantDetailActionTypes.UploadDocumentFailure: {
      return {
        ...state,
        uploadDocumentPending: false,
        uploadDocumentError: action.payload,
        uploadDocumentSuccess: false
      };
    }

    case MerchantDetailActionTypes.DownloadDocument: {
      return {
        ...state,
        downloadDocumentPending: true,
        downloadDocumentError: false,
        downloadDocumentSuccess: false,
      };
    }

    case MerchantDetailActionTypes.DownloadDocumentSuccess: {
      return {
        ...state,
        downloadDocumentPending: false,
        downloadDocumentError: false,
        downloadDocumentSuccess: true,
      };
    }

    case MerchantDetailActionTypes.DownloadDocumentFailure: {
      return {
        ...state,
        downloadDocumentPending: false,
        downloadDocumentError: action.payload,
        downloadDocumentSuccess: false,
      };
    }

    default:
      return state;
  }
}

export const getCollection = (state: State) => state.collection;
export const getCollectionPending = (state: State) => state.getCollectionPending;
export const getCollectionError = (state: State) => state.getCollectionSuccess;
export const getCollectionSuccess = (state: State) => state.getCollectionError;
export const getUpdatePending = (state: State) => state.updatePending;
export const getUpdateError = (state: State) => state.updateError;
export const getUpdateSuccess = (state: State) => state.updateSuccess;
export const getUploadDocumentPending = (state: State) => state.uploadDocumentPending;
export const getUploadDocumentError = (state: State) => state.uploadDocumentError;
export const getUploadDocumentSuccess = (state: State) => state.uploadDocumentSuccess;
export const getDownloadDocumentPending = (state: State) => state.downloadDocumentPending;
export const getDownloadDocumentSuccess = (state: State) => state.downloadDocumentSuccess;
export const getDownloadDocumentError = (state: State) => state.downloadDocumentError;
