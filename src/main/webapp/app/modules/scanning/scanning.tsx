import './scanning.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import Pay from '../pay/pay';
import Menu from '../menu/menu';

export interface IScanningProp extends StateProps, DispatchProps {}

export const ScanningType = () => window.location.hash.match(/loc/i) ? <Menu /> : <Pay />;

export class Scanning extends React.Component<IScanningProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <div>
        <ScanningType />
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanning);
