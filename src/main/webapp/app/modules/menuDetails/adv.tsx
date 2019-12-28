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
          <div
            style={{
              width: '100%',
              padding: '0 0 0 5%',
              height: '90px',
              position: 'fixed',
              top: '5%',
              zIndex: 1000,
              borderBottom: '1px solid #ececec'
            }}
            >
              <img src="http://app.yuanscore.com:8083/services/basic/api/public/getFiles/88"
              style={{
                float: 'left',
                height: '50px',
                width: '50px',
                display: 'block',
                marginTop: '20px'
              }} />
            <span
            style={{
              marginTop: '20px',
              marginLeft: '10px',
              float: 'left',
              textAlign: 'left'
            }}>
              天天麻辣烫
              <br/>
              5号桌
            </span>
          </div>
        {/* <div style={{ height: '45px' }} /> */}
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
