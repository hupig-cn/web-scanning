import React from 'react';
import { merchantGetOrderList, getMerchantOrder, changeOrderStatus } from 'app/requests/menu/menu.reducer';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import OrderList from './orderlist';

export interface IContentInt extends StateProps, DispatchProps { }

export class Title extends React.Component<IContentInt> {
  state = {
    orderList: [],
    open: false,
    orderDetailsList: [],
    orderDetailsHeight: '0px',
    num: 0,
    init: 0,
    url: ''
  };
  componentDidMount() {
    // console.log(this.state.num);
    const merchantId = window.location.search.substring(1).split('&')[1].split('=')[1];
    this.props.merchantGetOrderList(merchantId)
      // @ts-ignore
      .then(res => {
        if (res.value.data.data) {
          // console.log(res.value.data.data);
          // let reactor = "1";
          this.setState({
            url: window.location.search,
            orderList: res.value.data.data
            // orderDetailsHeight: ((res.value.data.data.length * 43) + 70) + 'px'
          });
        }
      });
  }
  details(open, index, init, orderId, e) {
    // console.log(orderId);
    this.props.getMerchantOrder(orderId)
      // @ts-ignore
      .then(res => {
        // console.log(res.value.data.data);
        if (res.value.data.data) {
          // console.log(res.value.data.data);
          // let reactor = "1";
          this.setState({
            orderDetailsList: res.value.data.data,
            orderDetailsHeight: ((res.value.data.data.length * 43) + 90) + 'px'
          });
          // console.log(this.state.orderDetailsHeight + ( res.value.data.data.length * 43 ) + 'px');
        }
      });
    if (init === 0) {
      this.setState({
        init: 1,
        open: open ? false : true,
        num: index
      });
    } else {
      if (this.state.num === index) {
        this.setState({
          open: open ? false : true
        });
      } else {
        this.setState({
          init: this.state.init + 1,
          open: true,
          num: index
        });
      }
    }
  }
  sureDetails(bigOrder, status, index, e) {
    if (status === '2') {
      const merchantId = window.location.search.substr(1).split('&')[1].split('=')[1];
      this.props.changeOrderStatus(merchantId, bigOrder)
        // @ts-ignore
        .then(res => {
          if (res.value.data.message === '修改成功!') {
            const _changeStatus_ = this.state.orderList[index];
            const changeStatus = '3';
            _changeStatus_.status = changeStatus;
            this.setState({
            });
          }
        });
    }
  }
  render() {
    return (
      <div style={{
        width: '100%',
        height: '92.5%',
        // marginBottom: '-10%',
        position: 'fixed',
        background: '#FAFAFA',
        top: '6%',
        marginBottom: '-43px',
        zIndex: 1000,
        overflowY: 'scroll',
        overflowX: 'hidden'
      }}>
        {...this.state.orderList.map((orderListData, index) => (
          <div
            key={index}
            style={{
              width: '100%',
              padding: '0 0 0 5%',
              height: this.state.init > 0 ? (this.state.num === index && this.state.open ? this.state.orderDetailsHeight : '75px') : '75px',
              zIndex: 1000,
              borderBottom: this.state.num === index && this.state.open ? '3px solid #ececec' : '1px solid #ececec'
            }} onClick={this.details.bind(this, this.state.open, index, this.state.init, orderListData.bigorder)}>
            <span
              style={{
                marginTop: '13px',
                marginLeft: '10px',
                float: 'left',
                textAlign: 'left'
              }}>
              {orderListData.location}号座
             <br />
              <span
                style={{
                  float: 'left',
                  textAlign: 'left',
                  fontSize: '2px'
                }}>
                {orderListData.modifierdate}
              </span>
            </span>
            <span
              onClick={this.sureDetails.bind(this, orderListData.bigorder, orderListData.status, index)}
              style={{
                marginTop: '20px',
                marginRight: '10px',
                float: 'right',
                textAlign: 'left',
                display: orderListData.status === '3' ? 'none' : 'block',
                background: 'red',
                padding: '5px',
                borderRadius: '5px'
              }}>
              待确认
            </span>
            <span
              onClick={this.sureDetails.bind(this, orderListData.bigorder, orderListData.status, index)}
              style={{
                marginTop: '20px',
                marginRight: '10px',
                float: 'right',
                textAlign: 'left',
                display: orderListData.status === '2' ? 'none' : 'block',
                background: '#78AF1D',
                padding: '5px',
                borderRadius: '5px'
              }}>
              已确认
            </span>
            <span
              style={{
                marginTop: '25px',
                marginRight: '5px',
                float: 'right',
                textAlign: 'left'
              }}> 共 <span style={{ color: '#fe4365' }}>{orderListData.numprice} ￥</span></span>
            <div style={{
              width: '50px',
              position: 'absolute',
              marginLeft: '40%',
              marginTop: '55px',
              height: '15px'
            }}>
              <img
                src="./content/images/jiangtou.jpg"
                style={{
                  width: '5px',
                  height: '24px',
                  marginLeft: '48%',
                  float: 'left',
                  display: 'block',
                  transform: this.state.num === index && this.state.open ? 'rotate(90deg)' : 'rotate(270deg)'
                }}
              /></div>
            {/* {console.log(this.state.orderDetailsList)} */}
            <OrderList openList={this.state.open} orderList={this.state.orderDetailsList} openNum={this.state.num} indexNum={index}
              init={this.state.init} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { merchantGetOrderList, getMerchantOrder, changeOrderStatus };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Title);
