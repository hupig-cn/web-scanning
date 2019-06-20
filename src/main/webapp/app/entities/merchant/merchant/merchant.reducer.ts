import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IMerchant, defaultValue } from 'app/shared/model/merchant/merchant.model';

export const ACTION_TYPES = {
  FETCH_MERCHANT_LIST: 'merchant/FETCH_MERCHANT_LIST',
  FETCH_MERCHANT: 'merchant/FETCH_MERCHANT',
  CREATE_MERCHANT: 'merchant/CREATE_MERCHANT',
  UPDATE_MERCHANT: 'merchant/UPDATE_MERCHANT',
  DELETE_MERCHANT: 'merchant/DELETE_MERCHANT',
  RESET: 'merchant/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMerchant>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MerchantState = Readonly<typeof initialState>;

// Reducer

export default (state: MerchantState = initialState, action): MerchantState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MERCHANT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MERCHANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MERCHANT):
    case REQUEST(ACTION_TYPES.UPDATE_MERCHANT):
    case REQUEST(ACTION_TYPES.DELETE_MERCHANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MERCHANT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MERCHANT):
    case FAILURE(ACTION_TYPES.CREATE_MERCHANT):
    case FAILURE(ACTION_TYPES.UPDATE_MERCHANT):
    case FAILURE(ACTION_TYPES.DELETE_MERCHANT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MERCHANT_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MERCHANT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MERCHANT):
    case SUCCESS(ACTION_TYPES.UPDATE_MERCHANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MERCHANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'services/merchant/api/merchants';
const customApiUrl = 'services/merchant/api/public';
// Actions
export const getMerchantsEntity: ICrudGetAction<IMerchant> = id => {
  const requestUrl = `${customApiUrl}/ObtainMerchant/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MERCHANT,
    payload: axios.get<IMerchant>(requestUrl)
  };
};

export const getEntities: ICrudGetAllAction<IMerchant> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MERCHANT_LIST,
    payload: axios.get<IMerchant>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMerchant> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MERCHANT,
    payload: axios.get<IMerchant>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMerchant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MERCHANT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IMerchant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MERCHANT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMerchant> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MERCHANT,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
