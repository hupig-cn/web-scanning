import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import Titles from './titles';
import Adv from './adv';
import Content from './content';

export interface IMenuProp extends StateProps, DispatchProps {}

export class MarchantMenuDetails extends React.Component<IMenuProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <div style={{ backgroundColor: '#f2f2f2', width: '100%' }}>
        <Titles />
        <Adv />
        {/* <Content /> */}
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
)(MarchantMenuDetails);
