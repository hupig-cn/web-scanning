import React from 'react';

import { IRootState } from 'app/shared/reducers';
import AllPrice from './allPrice';
import { connect } from 'react-redux';
import { caiorder, changeOrderState, createCaiOrder } from 'app/requests/menu/menu.reducer';

export interface IContentInt extends StateProps, DispatchProps { }

export class Content extends React.Component<IContentInt> {
  state = {
    orderList: []
  };

  componentDidMount() {
    const newOrderId = window.location.search.substring(1).split('&')[1].split('=')[1];
    const wechatOrder = newOrderId.substring(0).split('-');
    const lastOrder = (wechatOrder.length > 1 ? wechatOrder[0] : newOrderId);
    const userId = (wechatOrder.length > 1 ? wechatOrder[1] : '0');
    this.props
    .changeOrderState(
      lastOrder
      )
    // @ts-ignore
    .then(res => {

    });
    this.props
      .caiorder(
        lastOrder
        )
      // @ts-ignore
      .then(res => {
        if (res.value.data.data) {
          this.setState({
            orderList: res.value.data.data
          });
        }
      });
      this.props.createCaiOrder(userId, lastOrder);
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
          {...this.state.orderList.map((merchant, index) => (
            <div key={index} style={{ width: '100%', overflow: 'auto', float: 'right', position: 'fixed', top: '133px' }}>
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
const mapDispatchToProps = { caiorder, changeOrderState, createCaiOrder };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
