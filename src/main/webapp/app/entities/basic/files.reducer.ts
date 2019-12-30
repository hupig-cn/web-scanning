import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IFiles, defaultValue } from 'app/shared/model/basic/files.model';

export const ACTION_TYPES = {
  FETCH_FILES_LIST: 'files/FETCH_FILES_LIST',
  FETCH_FILES: 'files/FETCH_FILES',
  CREATE_FILES: 'files/CREATE_FILES',
  UPDATE_FILES: 'files/UPDATE_FILES',
  DELETE_FILES: 'files/DELETE_FILES',
  SET_BLOB: 'files/SET_BLOB',
  RESET: 'files/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFiles>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FilesState = Readonly<typeof initialState>;

// Reducer

export default (state: FilesState = initialState, action): FilesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FILES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FILES):
    case REQUEST(ACTION_TYPES.UPDATE_FILES):
    case REQUEST(ACTION_TYPES.DELETE_FILES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FILES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILES):
    case FAILURE(ACTION_TYPES.CREATE_FILES):
    case FAILURE(ACTION_TYPES.UPDATE_FILES):
    case FAILURE(ACTION_TYPES.DELETE_FILES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILES):
    case SUCCESS(ACTION_TYPES.UPDATE_FILES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/files';

// Actions

export const getMyImg: ICrudGetAction<IFiles> = (id: string) => {
  const requestUrl = `http://app.yuanscore.com:8083/services/basic/api/public/getFiles/3333`;
  return {
    type: ACTION_TYPES.FETCH_FILES,
    payload: axios.get<IFiles>(requestUrl)
  };
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
