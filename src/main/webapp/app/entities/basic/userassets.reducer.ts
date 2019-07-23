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
import { IUserassets, defaultValue } from 'app/shared/model/basic/userassets.model';

export const ACTION_TYPES = {
  FETCH_USERASSETS_LIST: 'userassets/FETCH_USERASSETS_LIST',
  FETCH_USERASSETS: 'userassets/FETCH_USERASSETS',
  CREATE_USERASSETS: 'userassets/CREATE_USERASSETS',
  UPDATE_USERASSETS: 'userassets/UPDATE_USERASSETS',
  DELETE_USERASSETS: 'userassets/DELETE_USERASSETS',
  RESET: 'userassets/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserassets>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UserassetsState = Readonly<typeof initialState>;

// Reducer

export default (state: UserassetsState = initialState, action): UserassetsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERASSETS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERASSETS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERASSETS):
    case REQUEST(ACTION_TYPES.UPDATE_USERASSETS):
    case REQUEST(ACTION_TYPES.DELETE_USERASSETS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERASSETS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERASSETS):
    case FAILURE(ACTION_TYPES.CREATE_USERASSETS):
    case FAILURE(ACTION_TYPES.UPDATE_USERASSETS):
    case FAILURE(ACTION_TYPES.DELETE_USERASSETS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERASSETS_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERASSETS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERASSETS):
    case SUCCESS(ACTION_TYPES.UPDATE_USERASSETS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERASSETS):
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

const apiUrl = 'basic/api/userassets';

// Actions

export const getEntities: ICrudGetAllAction<IUserassets> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_USERASSETS_LIST,
    payload: axios.get<IUserassets>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IUserassets> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERASSETS,
    payload: axios.get<IUserassets>(requestUrl)
  };
};

export const queryBalance: ICrudGetAction<IUserassets> = userid => {
  const requestUrl = `${apiUrl}/findUserAssets/${userid}`;
  return {
    type: ACTION_TYPES.FETCH_USERASSETS,
    payload: axios.get<IUserassets>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserassets> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERASSETS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IUserassets> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERASSETS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserassets> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERASSETS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
