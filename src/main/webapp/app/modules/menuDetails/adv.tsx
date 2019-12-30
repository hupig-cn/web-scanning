import React from 'react';
import { caiorder } from 'app/requests/menu/menu.reducer';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

export interface IContentInt extends StateProps, DispatchProps { }

export class Title extends React.Component<IContentInt> {
  state = {
    orderList: []
  };

  componentDidMount() {
    // let userId = (window.location.search.substring(1).split("&")[0]).split("=")[1]
    // let loc = (window.location.search.substring(1).split("&")[1]).split("=")[1]
    // @ts-ignore
    // this.props.menu("12","34")
    this.props
      .caiorder(
        window.location.search
          .substring(1)
          .split('&')[0]
          .split('=')[1])
      // @ts-ignore
      .then(res => {
        if (res.value.data.data) {
          // console.log(res.value.data.data);
          // let reactor = "1";
          this.setState({
            orderList: res.value.data.data
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
            background: '#FAFAFA',
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
          {...this.state.orderList.map((merchant, index) => (
            <span
              key={index}
              style={{
                marginTop: '20px',
                marginLeft: '10px',
                float: 'left',
                textAlign: 'left'
              }}>
              {merchant.mName}
              <br />
              {merchant.iocid}号座
            </span>
          ))}
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

const mapDispatchToProps = { caiorder };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Title);
