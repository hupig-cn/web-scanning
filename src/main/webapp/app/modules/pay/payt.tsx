import './pay.scss';
import React from 'react';
import { connect } from 'react-redux';
import { getMerchantsEntity } from 'app/entities/merchant/merchant/merchant.reducer';
import { IRootState } from 'app/shared/reducers';
import Header from 'app/modules/pay/header';
import { getMyImg } from 'app/entities/basic/files.reducer';
import { queryBalance } from 'app/entities/basic/userassets.reducer';
import { toast } from 'react-toastify';
import { merchantPayment, paymethods, merchantPaymentWeChat } from 'app/entities/basic/linkuser/linkuser.reducer';
import { createCaiOrder } from 'app/requests/menu/menu.reducer';
import FirstSetPayPass from 'app/modules/pay/firstSetPayPass';
import Payment from 'app/modules/pay/payment';
import { passwordCheck } from 'app/shared/reducers/authentication';

export interface IPaytProp extends StateProps, DispatchProps {
  id: string;
  userid: string;
  auth_code: string;
  wechat: string;
}

export class Payt extends React.Component<IPaytProp> {
  state = {
    file: '',
    fileContentType: '',
    id: this.props.id,
    userid: this.props.userid,
    auth_code: this.props.auth_code,
    wechat: this.props.wechat,
    sum: this.props.sum,
    order: this.props.order,
    balance: false,
    coupon: false,
    paymethod: '',
    money: '',
    statics: 1,
    merchantCode: Number,
    sum: window.location.search
          .substring(1)
          .split('&')[1]
          .split('=')[1],
    order: window.location.search
          .substring(1)
          .split('&')[2]
          .split('=')[1]
  };
  componentDidMount() {
    if (this.state.userid !== '') {
      this.props.queryBalance(this.state.userid);
      this.props
        .paymethods(false, navigator.userAgent.toLowerCase().match(/iphone/i) ? 'ios' : 'android')
        // @ts-ignore
        .then(val => {
          if (val.value.data.code > 0) {
            val.value.data.data.map(pays => {
              if (pays.other === '余额') {
                this.setState({ balance: true });
              } else if (pays.other === '优惠劵') {
                this.setState({ coupon: true });
              }
            });
          }
        });
    }
    this.props
      .getMerchantsEntity(this.state.id)
      // @ts-ignore
      .then(key => {
        this.props
          .getMyImg(key.value.data.merchantphoto)
          // @ts-ignore
          .then(photo => {
            this.setState({
              file: photo.value.data.file,
              fileContentType: photo.value.data.fileContentType
            });
          });
      });
  }

  Payment = () => {
    const key = 100;
    const nums = (Number(key) * this.props.merchantEntity.rebate) / 100;
    if (Number(key) > 0) {
      if (this.state.statics === 2) {
        toast.info('请勿在同一时间多次提交订单。');
        return;
      }
      this.setState({ statics: 2 });
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.match(/MicroMessenger/i)) {
        this.props
          .merchantPaymentWeChat(
            this.props.wechat,
            key,
            this.props.merchantEntity.userid,
            this.props.merchantEntity.concession,
            this.props.merchantEntity.rebate,
            this.props.merchantEntity.name
          )
          // @ts-ignore
          .then(val => {
            if (val.value.data !== '订单生成错误' && val.value.data !== '获取微信会员信息失败' && val.value.data !== '调用微信支付失败') {
              // @ts-ignore
              // tslint:disable-next-line: no-shadowed-variable
              const keys = val.value.data.data[0];
              // @ts-ignore
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                {
                  appId: keys.appId, // 公众号名称，由商户传入
                  timeStamp: keys.timeStamp.toString(), // 时间戳，自1970年以来的秒数
                  nonceStr: keys.nonceStr, // 随机串
                  package: keys.package,
                  signType: 'MD5', // 微信签名方式：
                  paySign: keys.paySign // 微信签名
                },
                // tslint:disable-next-line: only-arrow-functions
                function(res) {
                  if (res.err_msg === 'get_brand_wcpay_request:ok') {
                    // 给钱成功
                    this.props.createCaiOrder(this.props.wechat, this.state.order);
                    window.location.replace(
                      'http://localhost:8080/?details=' + `${this.props.order}`
                    );
                  } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                    window.location.replace('http://app.yuanscore.com/?payerror=0');
                  } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                    window.location.replace('http://app.yuanscore.com/?payerror=0');
                  }
                }
              );
              // window.location.replace('alipays://platformapi/startapp?' + 'appId=20000067&' + 'url=' + val.value.data);
              // 启动支付
            } else {
              toast.info('链接超时');
            }
          });
      } else if (userAgent.match(/Alipay/i)) {
        this.props
          .merchantPayment(
            this.state.auth_code,
            key,
            this.props.merchantEntity.userid,
            this.props.merchantEntity.concession,
            this.props.merchantEntity.rebate,
            this.props.merchantEntity.name
          )
          // @ts-ignore
          .then(val => {
            if (val.value.data !== '订单生成错误') {
              window.location.replace('alipays://platformapi/startapp?' + 'appId=20000067&' + 'url=' + val.value.data);
            } else {
              toast.info('链接超时');
            }
          });
      } else if (userAgent.match(/Weisen/i)) {
        document.getElementById('bottomdiv').style.height = '50%';
      } else {
        toast.info('不支持除支付宝，微信，元积分之外的支付方式。');
      }
    }
  };

  balancePay = () => {
    const key = (document.getElementById('amount') as HTMLInputElement).value;
    if (Number(key) > 0) {
      if (isNaN(Number(this.props.userassetsEntity.usablebalance)) || Number(this.props.userassetsEntity.usablebalance) < Number(key)) {
        toast.error('提示：余额不足，请更换其他支付方式。');
      } else {
        const result = this.props.passwordCheck();
        // @ts-ignore
        result.then(res => {
          if (res.value.data.code === 0) {
            document.getElementById('superbottomdiv').style.height = '80%';
          } else {
            this.setState({ paymethod: 'yue', money: key });
            document.getElementById('supersuperbottomdiv').style.height = '100%';
          }
        });
      }
    }
  };

  couponPay = () => {
    const key = (document.getElementById('amount') as HTMLInputElement).value;
    if (Number(key) > 0) {
      if (isNaN(Number(this.props.userassetsEntity.usablebalance)) || Number(this.props.userassetsEntity.couponsum) < Number(key)) {
        toast.error('提示：优惠劵不足，请更换其他支付方式。');
      } else {
        const result = this.props.passwordCheck();
        // @ts-ignore
        result.then(res => {
          if (res.value.data.code === 0) {
            document.getElementById('superbottomdiv').style.height = '80%';
          } else {
            this.setState({ paymethod: 'coupon', money: key });
            document.getElementById('supersuperbottomdiv').style.height = '100%';
          }
        });
      }
    }
  };

  render() {
    const { merchantEntity, userassetsEntity } = this.props;

    function AmountOnInput() {
      const el = document.getElementById('bonusValue') as HTMLInputElement;
      const els = (document.getElementById('amount') as HTMLInputElement).value;
      el.textContent = String((Number(els) * merchantEntity.rebate) / 100);
    }
    function bottomdivheight() {
      document.getElementById('bottomdiv').style.height = '0%';
    }

    return (
      <div>
        <div className="jh-body">
          <div style={{ width: '80%', marginLeft: '10%' }}>
            <Header isAuthenticated />
            <img src={this.state.fileContentType ? `data:${this.state.fileContentType};base64,${this.state.file}` : null} />
            <h6>付款给{merchantEntity.name}</h6>
            <p>可获得积分({merchantEntity.rebate}%)</p>
            <p className={'jh-amount-h6'}>付款金额</p>
            <div>
              <h1>￥</h1>
              <input type="number" id="amount" className={'jh-amount'} onInput={AmountOnInput} onClick={bottomdivheight} />
            </div>
            <Hrmargin />
            <label id="bonusValue" className="jh-integral">
              0
            </label>
            <p>可获得积分:</p>
            <button type="button" onClick={this.Payment} id="thisbuttonpay">
              立即支付
            </button>
          </div>
          <div>
            <img
              src="./content/images/adv.jpg"
              style={{
                float: 'none',
                width: '100%',
                height: 'auto',
                marginTop: '35px'
              }}
            />
          </div>
          <div
            id="bottomdiv"
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
            <div style={{ padding: '10px 20px 15px 20px  ', borderTop: '1px solid #cccccc' }}>
              请选择支付方式：
              <span style={{ float: 'right' }} onClick={bottomdivheight}>
                ㄨ
              </span>
            </div>

            {this.state.balance ? (
              <div style={{ width: '100%' }} onClick={this.balancePay}>
                <div style={{ padding: '13px 30px', borderTop: '1px solid #eeeeee' }}>
                  <span>○ </span>余额支付
                  <span style={{ float: 'right' }}>可用余额：{userassetsEntity.usablebalance}</span>
                </div>
              </div>
            ) : (
              <div />
            )}
            {this.state.coupon ? (
              <div style={{ width: '100%' }} onClick={this.couponPay}>
                <div style={{ padding: '13px 30px', borderTop: '1px solid #eeeeee' }}>
                  <span>○ </span>优惠劵支付
                  <span style={{ float: 'right' }}>可用优惠劵：{userassetsEntity.couponsum}</span>
                </div>
              </div>
            ) : (
              <div />
            )}
            {!this.state.balance && !this.state.coupon ? (
              <div style={{ width: '100%', textAlign: 'center' }}>暂无可用支付方式</div>
            ) : (
              <div />
            )}
            <div style={{ borderTop: '1px solid #eeeeee' }} />
          </div>
        </div>
        <FirstSetPayPass />
        <Payment
          paymethod={this.state.paymethod}
          userid={this.props.userid}
          money={this.state.money}
          merchantid={merchantEntity.userid}
          concession={merchantEntity.concession}
          rebate={merchantEntity.rebate}
        />
      </div>
    );
  }
}

const Hrmargin = userAgent => {
  userAgent = navigator.userAgent.toLowerCase();
  return <hr className={userAgent.match(/iphone/i) ? 'jh-iphone-hr' : 'jh-android-hr'} />;
};

const mapStateToProps = ({ merchant, userassets }: IRootState) => ({
  merchantEntity: merchant.entity,
  userassetsEntity: userassets.entity
});

const mapDispatchToProps = {
  passwordCheck,
  getMerchantsEntity,
  getMyImg,
  queryBalance,
  merchantPayment,
  paymethods,
  merchantPaymentWeChat,
  createCaiOrder
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payt);
