import React from 'react';
import { connect } from 'react-redux';
import { getSession, passwordCheck } from 'app/shared/reducers/authentication';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {
  yuePay,
  integralPay,
  couponPayment,
  merchantPaymentYue,
  merchantPaymentCoupon
} from 'app/entities/basic/linkuser/linkuser.reducer';
import { toast } from 'react-toastify';

export interface IPaymentProp extends StateProps, DispatchProps {
  paymethod: string;
  userid: string;
  money: string;
  merchantid: string;
  concession: number;
  rebate: number;
}

export class Payment extends React.Component<IPaymentProp> {
  state = {
    paymethod: this.props.paymethod,
    userid: this.props.userid,
    money: this.props.money,
    merchantid: this.props.merchantid,
    concession: this.props.concession,
    rebate: this.props.rebate,
    statics: 1
  };
  superHandleSubmit = (event, errors, { password }) => {
    const { paymethod, userid, money, merchantid, concession, rebate } = this.props;
    console.log(window.location.search
      .substring(1)
      .split('&')[1]);
    if (paymethod === 'yue') {
      if (this.state.statics === 2) {
        toast.info('请勿在同一时间多次支付订单。');
        return;
      }
      this.setState({ statics: 2 });
      const orderResult = this.props.merchantPaymentYue(userid, money, merchantid, concession, rebate);
      // @ts-ignore
      orderResult.then(res => {
        if (res.value.data !== null) {
          const orderid = res.value.data;
          const result = this.props.yuePay(orderid, password);
          // @ts-ignore
          // tslint:disable-next-line: no-shadowed-variable
          result.then(res => {
            if (res.value.data.code === 1) {
              // if ( == 'sum') {
              //     window.location.replace(
              //       'http://localhost:8084/?details=' + `${window.location.search.substring(1)
              //       .split('&')[2]
              //       .split('=')[1]}`
              //     );
              // }
              window.location.replace('http://localhost:9000/?resapp=' + String((Number(money) * rebate) / 100));
            } else {
              toast.error('错误：' + res.value.data.message.toString());
            }
          });
        } else {
          toast.error('错误：' + res.value.data.message.toString());
        }
      });
    } else if (paymethod === 'coupon') {
      const orderResult = this.props.merchantPaymentYue(userid, money, merchantid, concession, rebate);
      // @ts-ignore
      orderResult.then(res => {
        if (res.value.data !== null) {
          const orderid = res.value.data;
          const result = this.props.couponPayment(orderid, password);
          // @ts-ignore
          // tslint:disable-next-line: no-shadowed-variable
          result.then(res => {
            if (res.value.data.code === 1) {
              window.location.replace('http://app.yuanscore.com/?resapp=coupon');
            } else {
              toast.error('错误：' + res.value.data.message.toString());
            }
          });
        } else {
          toast.error('错误：' + res.value.data.message.toString());
        }
      });
    }
  };

  render() {
    return (
      <div
        id="supersuperbottomdiv"
        style={{
          backgroundColor: '#fbfbfb',
          width: '100%',
          position: 'fixed',
          bottom: '0px',
          textAlign: 'left',
          height: '0%',
          transition: 'height 500ms'
        }}
      >
        <div>
          <div
            style={{
              height: '60px',
              width: '100%',
              textAlign: 'center',
              margin: '80px 0px 20px 0px'
            }}
          >
            <span style={{ fontSize: '1.8rem' }}>支付密码</span>
            <div />
            <span style={{ fontSize: '1.2rem' }}>请输入支付密码，以验证身份</span>
          </div>
          <AvForm onSubmit={this.superHandleSubmit}>
            <div
              style={{
                height: '100px',
                width: '50%',
                margin: '0 auto',
                marginTop: '0.5rem',
                boxSizing: 'border-box',
                display: 'flex'
              }}
            >
              <AvField name="password" type="password" placeholder={'请输入密码'} required errorMessage="密码不能为空!" />
            </div>
            <div style={{ minHeight: '50px' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#fe4365',
                  width: '80%',
                  border: 'none',
                  color: 'white',
                  textDecoration: 'none',
                  display: 'inline-block',
                  fontSize: '16px',
                  marginTop: '5px',
                  height: '45px',
                  borderRadius: '4px',
                  left: '10%',
                  position: 'absolute'
                }}
              >
                确认支付
              </button>
            </div>
          </AvForm>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, yuePay, integralPay, couponPayment, passwordCheck, merchantPaymentYue, merchantPaymentCoupon };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
