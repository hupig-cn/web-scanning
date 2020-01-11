import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { changeOrderStatus } from 'app/requests/menu/menu.reducer';

export interface IContentInt extends StateProps, DispatchProps {
      openList: Boolean,
      orderList: any[],
      openNum: Number,
      indexNum: Number,
      init: Number
}

export class OrderList extends React.Component<IContentInt> {

  componentDidMount() {

  }

  render() {
    return (
      <div  style={{
        display: this.props.init > 0 ? (this.props.openNum === this.props.indexNum && this.props.openList? '': 'none') : 'none',
        position: 'absolute',
        marginTop: '75px',
        width: '100%'
      }}>
        {...this.props.orderList.map((orderListData, index) => (
        <div
        key={index}
        style={{
          marginTop: '13px',
          width: '100%',
          height:'30px',
          background: '#D4D4D2',
          borderRadius: '15px'
        }}>
          <span
          style={{
            display: 'block',
            float: 'left',
            marginLeft: '20px',
            marginTop: '3px'
          }}
          >
            {orderListData.name} *{orderListData.num}
          </span>
          <span
          style={{
            float: 'right',
            marginRight: '7%'
          }}>
            共 <span style={{ color: '#fe4365' }}>{orderListData.numprice} ￥</span>
          </span>
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

const mapDispatchToProps = { changeOrderStatus };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);
