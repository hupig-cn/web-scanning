import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import { IRootState } from 'app/shared/reducers';
import { setLocale } from 'app/shared/reducers/locale';
import AppRoutes from 'app/routes';

export interface IAppProps extends StateProps, DispatchProps {}

export class App extends React.Component<IAppProps> {
  render() {
    return <AppRoutes />;
  }
}

const mapStateToProps = ({ applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});

const mapDispatchToProps = { setLocale };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App));
