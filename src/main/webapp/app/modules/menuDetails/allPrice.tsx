import React from 'react';
import { merchantName } from 'app/requests/menu/menu.reducer';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

export interface IContentInt extends StateProps, DispatchProps {}

export class Title extends React.Component<IContentInt> {
  state = {
    getImagesList: []
  };

  componentDidMount() {
    // let userId = (window.location.search.substring(1).split("&")[0]).split("=")[1]
    // let loc = (window.location.search.substring(1).split("&")[1]).split("=")[1]
    // @ts-ignore
    // this.props.menu("12","34")

  }

  render() {
    return (
      <div>
        <div
        style={{
          height: '50px',
          width: '100%',
          paddingRight: '5%'
        }}
        >
          <span
          style={{
            float: 'right',
            margin: '30px 0 0 10px'
          }}>
          共计23 ￥
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { merchantName };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Title);
