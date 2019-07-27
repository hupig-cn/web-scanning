import axios from 'axios';
import { ICrudDeleteAction, Storage } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { setLocale } from 'app/shared/reducers/locale';
import { ILinkuser } from 'app/shared/model/basic/linkuser.model';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  GET_SESSION: 'authentication/GET_SESSION',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE'
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: {} as any,
  errorMessage: null as string, // Errors returned from server side
  redirectMessage: null as string,
  sessionHasBeenFetched: false,
  idToken: null as string,
  logoutUrl: null as string
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
    case REQUEST(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
        errorMessage: action.payload,
        showModalLogin: true,
        loginError: true
      };
    case FAILURE(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true
      };
    case SUCCESS(ACTION_TYPES.LOGOUT):
      return {
        ...initialState,
        showModalLogin: true
      };
    case SUCCESS(ACTION_TYPES.GET_SESSION): {
      const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        account: action.payload.data
      };
    }
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...initialState,
        showModalLogin: true,
        redirectMessage: action.message
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export const displayAuthError = message => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });

export const getSession = () => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: axios.get('services/login/api/account')
  });

  const { account } = getState().authentication;
  if (account && account.langKey) {
    const langKey = Storage.session.get('locale', account.langKey);
    await dispatch(setLocale(langKey));
  }
};

// tslint:disable-next-line: ter-arrow-body-style
export const getSessionRE = () => async (dispatch, getState) => {
  return {
    payload: axios.get('services/login/api/account')
  };
};

// tslint:disable-next-line: ter-arrow-body-style
export const sendSms = (phone: any) => async (dispatch: any) => {
  return dispatch({
    payload: axios.post('services/login/api/public/send-sms', { phone })
  });
};

// tslint:disable-next-line: no-shadowed-variable
export const register = (login: any, password: any, lastName: any) => async (dispatch: any) => {
  // tslint:disable-next-line: ter-arrow-body-style
  return dispatch({
    payload: axios.post('services/login/api/public/phone-user', { login, password, lastName })
  });
};

// tslint:disable-next-line: no-shadowed-variable
export const registerRandom = () => async dispatch => {
  // tslint:disable-next-line: ter-arrow-body-style
  const result = await dispatch({
    payload: axios.get('services/login/api/public/random-user')
  });
  return result;
};

export const login = (username, password, rememberMe = false) => async (dispatch, getState) => {
  const result = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: axios.post('auth/login', { username, password })
  });
  await dispatch(getSession());
};

export const logout = () => async dispatch => {
  await dispatch({
    type: ACTION_TYPES.LOGOUT,
    payload: axios.post('auth/logout', {})
  });

  // fetch new csrf token
  dispatch(getSession());
};

export const deleteUsers = userid => async dispatch => {
  const requestUrl = `services/login/api/public/deluser/${userid}`;
  const result = await dispatch({
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const clearAuthentication = messageKey => (dispatch, getState) => {
  dispatch(displayAuthError(messageKey));
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH
  });
};

// tslint:disable-next-line: ter-arrow-body-style
export const passwordCheck = () => async (dispatch: any) => {
  return dispatch({
    payload: axios.get('services/basic/api/payment/check')
  });
};

// tslint:disable-next-line: ter-arrow-body-style
export const updatePassword = (payPassword: any) => async (dispatch: any) => {
  return dispatch({
    payload: axios.post('services/basic/api/payment/update-password', { payPassword })
  });
};
