import React from 'react';

import { IRootState } from 'app/shared/reducers';
import AllPrice from './allPrice';
import { connect } from 'react-redux';
import { caiorder } from 'app/requests/menu/menu.reducer';

export interface IContentInt extends StateProps, DispatchProps { }

export class Content extends React.Component<IContentInt> {
  state = {
    orderList: []
  };

  componentDidMount() {
    // let userId = (window.location.search.substring(1).split("&")[0]).split("=")[1]
    // let loc = (window.location.search.substring(1).split("&")[1]).split("=")[1]
    this.props
      .caiorder(
        window.location.search
          .substring(1)
          .split('&')[1]
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
      <div style={{ position: 'relative' }}>
          {...this.state.orderList.map((merchant, index) => (
            <div key={index} style={{ width: '100%', overflow: 'auto', float: 'right', position: 'fixed', top: '15%', bottom: '6.3%' }}>
            {merchant.list.map((listOrder, ind) => (
            <div
              key={ind}
              style={{
                padding: '10px 10px 0px 5%',
                overflow: 'hidden'
              }}
              >
              {/* {console.log(listOrder)} */}
              {/* {console.log(merchant['list'][index])} */}
              <div
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ececec',
                  overflow: 'hidden'
                }}
              >
                <span>
                  <img
                    style={{
                      width: '50px',
                      height: '50px',
                      float: 'left'
                    }} src={ listOrder.url }
                  />
                  {/* http://app.yuanscore.com:8083/services/basic/api/public/getFiles/29 */}
                </span>
                <span
                  style={{
                    float: 'left',
                    width: 'calc(100% - 75px)',
                    fontSize: '1.05rem',
                    marginLeft: '15px',
                    textAlign: 'left'
                  }}
                >
                  <span>{ listOrder.name }</span>
                  <span style={{
                    float: 'right'
                  }}> { listOrder.sum } ￥</span>
                </span>
                <span
                  style={{
                    float: 'left',
                    width: 'calc(100% - 75px)',
                    fontSize: '0.93rem',
                    marginLeft: '15px',
                    textAlign: 'left'
                  }}
                >
                  ×{ listOrder.num }
                  </span>
              </div>
            </div>
              ))}
          <AllPrice />
        </div>
          ))}
      </div>
    );
  }
  // <div></div>
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
)(Content);
