import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import linkuser, {
  LinkuserState
} from 'app/entities/basic/linkuser/linkuser.reducer';
import merchant, {
  MerchantState
} from 'app/entities/merchant/merchant/merchant.reducer';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly linkuser: LinkuserState;
  readonly merchant: MerchantState;
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  linkuser,
  merchant,
  loadingBar
});

export default rootReducer;
