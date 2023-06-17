import { MerchantsActionTypes, MerchantsActions } from '@modules/super-admin/actions/merchants.actions';
import { IMerchant } from '@interfaces/merchant.interface';

export interface State {
  merchants: IMerchant[];

  getAllMerchantDataPending: boolean;
  getAllMerchantDataError: String | boolean;
  getAllMerchantDataSuccess: boolean;
}

export const initialState: State = {
  merchants: [],

  getAllMerchantDataPending: true,
  getAllMerchantDataError: false,
  getAllMerchantDataSuccess: false
};

export function reducer(state= initialState, action: MerchantsActions) {
  switch (action.type) {
    case MerchantsActionTypes.GetAllMerchants:
      return {
        ...state,
        getAllMerchantDataPending: true,
        getAllMerchantDataError: false,
        getAllMerchantDataSuccess: false
      };

    case MerchantsActionTypes.GetAllMerchantsSuccess:
      return {
        ...state,
        merchants: action.payload,
        getAllMerchantDataPending: false,
        getAllMerchantDataError: false,
        getAllMerchantDataSuccess: true
      };

    case MerchantsActionTypes.GetAllMerchantsFailure:
      return {
        ...state,
        getAllMerchantDataPending: false,
        getAllMerchantDataError: action.payload,
        getAllMerchantDataSuccess: false
      };

    default:
      return state;
  }
}

export const getMerchants = (state: State) => state.merchants;
export const getMerchantsPending = (state: State) => state.getAllMerchantDataPending;
export const getMerchantsSuccess = (state: State) => state.getAllMerchantDataSuccess;
export const getMerchantsError = (state: State) => state.getAllMerchantDataError;
