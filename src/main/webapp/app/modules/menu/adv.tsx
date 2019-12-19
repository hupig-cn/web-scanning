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

    this.props
      .merchantName(
        window.location.search
          .substring(1)
          .split('&')[0]
          .split('=')[1]
      )
      // @ts-ignore
      .then(res => {
        if (res.value.data.data) {
          // let reactor = "1";
          this.setState({
            getImagesList: res.value.data.data
          });
        }
      });
  }

  render() {
    return (
      <div>
        {...this.state.getImagesList.map(merchant => (
          <div
            key={merchant.id}
            style={{
              width: '100%',
              position: 'fixed',
              top: '40px',
              zIndex: 1000
            }}
          >
            <img style={{ width: '100%', height: '65px' }} src={merchant.merchantphoto} />
          </div>
        ))}
        <div style={{ height: '45px' }} />
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
