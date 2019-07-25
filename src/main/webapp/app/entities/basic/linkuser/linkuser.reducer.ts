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

export const queryAlipayUser = (authCode: string) => {
  const requestUrl = `services/basic/api/public/queryAlipayUser/?authCode=${authCode}`;
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

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
