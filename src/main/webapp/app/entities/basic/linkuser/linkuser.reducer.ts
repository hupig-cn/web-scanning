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
import { ILinkuser, defaultValue } from 'app/shared/model/basic/linkuser.model';

export const ACTION_TYPES = {
  FETCH_LINKUSER_LIST: 'linkuser/FETCH_LINKUSER_LIST',
  FETCH_LINKUSER: 'linkuser/FETCH_LINKUSER',
  CREATE_LINKUSER: 'linkuser/CREATE_LINKUSER',
  UPDATE_LINKUSER: 'linkuser/UPDATE_LINKUSER',
  DELETE_LINKUSER: 'linkuser/DELETE_LINKUSER',
  RESET: 'linkuser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILinkuser>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LinkuserState = Readonly<typeof initialState>;

// Reducer

export default (state: LinkuserState = initialState, action): LinkuserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LINKUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LINKUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LINKUSER):
    case REQUEST(ACTION_TYPES.UPDATE_LINKUSER):
    case REQUEST(ACTION_TYPES.DELETE_LINKUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LINKUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LINKUSER):
    case FAILURE(ACTION_TYPES.CREATE_LINKUSER):
    case FAILURE(ACTION_TYPES.UPDATE_LINKUSER):
    case FAILURE(ACTION_TYPES.DELETE_LINKUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LINKUSER_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LINKUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LINKUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_LINKUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LINKUSER):
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

const apiUrl = 'services/basic/api/linkusers';

// Actions

export const getEntities: ICrudGetAllAction<ILinkuser> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LINKUSER_LIST,
    payload: axios.get<ILinkuser>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const bindingAlipay = (authCode: any, userid: any) => {
  const requestUrl = `services/basic/api/public/bindingAlipay?authCode=${authCode}&userid=${userid}`;
  return {
    payload: axios.get(`${requestUrl}`)
  };
};

export const bindingWeChat = (code: any, userid: any) => {
  const requestUrl = `services/basic/api/public/bindingWeChat?code=${code}&userid=${userid}`;
  return {
    payload: axios.get(`${requestUrl}`)
  };
};

export const getEntity: ICrudGetAction<ILinkuser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LINKUSER,
    payload: axios.get<ILinkuser>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILinkuser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LINKUSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ILinkuser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LINKUSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILinkuser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LINKUSER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const queryAlipayUser = (authCode: string) => async dispatch => {
  const requestUrl = `services/basic/api/public/queryAlipayUser/?authCode=${authCode}`;
  const result = await dispatch({
    payload: axios.get(requestUrl)
  });
  return result;
};

export const queryWeChatUser = (code: string) => async dispatch => {
  const requestUrl = `services/basic/api/public/queryWeChatUser/${code}`;
  const result = await dispatch({
    payload: axios.get(requestUrl)
  });
  return result;
};

export const merchantPayment = (authCode: string, money: string, merchantid: string, concession: number, rebate: number, name: string) => {
  // tslint:disable-next-line: max-line-length
  const requestUrl = `services/basic/api/public/merchantPayment/?authCode=${authCode}&money=${money}&merchantid=${merchantid}&concession=${concession}&rebate=${rebate}&name=${name}`;
  return {
    payload: axios.get(requestUrl)
  };
};


export const merchantPayment2 = (authCode: string, money: string, merchantid: string, concession: number, rebate: number, name: string,order: string) => {
  // tslint:disable-next-line: max-line-length
  const requestUrl = `services/basic/api/public/merchantPayment/?authCode=${authCode}&money=${money}&merchantid=${merchantid}&concession=${concession}&rebate=${rebate}&name=${name}&order=${order}`;
  return {
    payload: axios.get(requestUrl)
  };
};


export const merchantPaymentWeChat = (
  userid: string,
  money: string,
  merchantid: string,
  concession: number,
  rebate: number,
  name: string
) => {
  // tslint:disable-next-line: max-line-length
  const requestUrl = `services/basic/api/public/merchantPaymentWeChat/?userid=${userid}&money=${money}&merchantid=${merchantid}&concession=${concession}&rebate=${rebate}&name=${name}`;
  return {
    payload: axios.get(requestUrl)
  };
};

export const merchantPaymentYue = (userid: string, money: string, merchantid: string, concession: number, rebate: number) => {
  // tslint:disable-next-line: max-line-length
  const requestUrl = `services/basic/api/public/merchantPayment-yue/?userid=${userid}&money=${money}&merchantid=${merchantid}&concession=${concession}&rebate=${rebate}`;
  return {
    payload: axios.get(requestUrl)
  };
};

export const merchantPaymentCoupon = (userid: string, money: string, merchantid: string, concession: number, rebate: number) => {
  // tslint:disable-next-line: max-line-length
  const requestUrl = `services/basic/api/public/merchantPayment-coupon/?userid=${userid}&money=${money}&merchantid=${merchantid}&concession=${concession}&rebate=${rebate}`;
  return {
    payload: axios.get(requestUrl)
  };
};

export const createUserByScanningMerchant = (userid: string, token: string, accounttype: string) => {
  const requestUrl = `services/basic/api/public/user/createUserByScanningMerchant/?userid=${userid}&token=${token}&accounttype=${accounttype}`;
  return {
    payload: axios.get(requestUrl)
  };
};

export const createUserByShareLink = (userid: string, token: string, accounttype: string, articleid: string) => {
  const requestUrl = `services/basic/api/public/user/createUserByShareLink/?userid=${userid}&token=${token}&accounttype=${accounttype}&articleid=${articleid}`;
  return {
    payload: axios.get(requestUrl)
  };
};

export const paymethods = (online: boolean, os: string) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('services/basic/api/get-paymethods', { online, os })
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

// 余额支付
export const yuePay = (orderid: any, password: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('services/basic/api/pay/BalencePayment', { orderid, password })
  });
  return result;
};
// 积分支付
export const integralPay = (orderid: any, password: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('services/basic/api/pay/IntegralPayment', { orderid, password })
  });
  return result;
};
// 优惠券支付
export const couponPayment = (orderid: any, password: any) => async dispatch => {
  const result = await dispatch({
    payload: axios.post('services/basic/api/pay/couponPayment', { orderid, password })
  });
  return result;
};
