import React from 'react';
import { caiorder } from 'app/requests/menu/menu.reducer';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

export interface IContentInt extends StateProps, DispatchProps {}

export class Title extends React.Component<IContentInt> {
  state = {
    orderList: []
  };

  componentDidMount() {
    // let userId = (window.location.search.substring(1).split("&")[0]).split("=")[1]
    // let loc = (window.location.search.substring(1).split("&")[1]).split("=")[1]
    // @ts-ignore
    const newOrderId = window.location.search.substring(1).split('&')[1].split('=')[1];
    const wechatOrder = newOrderId.substring(0).split('-');
    const lastOrder = (wechatOrder.length > 1 ? wechatOrder[0] : newOrderId);
    this.props
    .caiorder(lastOrder)
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
          height: '50px',
          width: '100%',
          paddingRight: '5%'
        }}
        >
          {...this.state.orderList.map((orderListData, index) => (
          <span
          key={index}
          style={{
            float: 'right',
            margin: '10px 0 0 10px'
          }}>
          共计 ： <span style={{ color: '#fe4365' }}>{orderListData.zongsum} ￥</span>
          </span>
          ))}
        </div>
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
