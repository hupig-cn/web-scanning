import './pay.scss';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { getMerchantsEntity } from 'app/entities/merchant/merchant/merchant.reducer';
import { IRootState } from 'app/shared/reducers';

import Header from 'app/modules/pay/header';
import Complete from '../pay/complete';
import initStore from 'app/config/store';
import { registerLocale } from 'app/config/translation';
import ReactDOM from 'react-dom';

const store = initStore();
registerLocale(store);

const rootEl = document.getElementById('root');

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    rootEl
  );

export interface IPayProp extends StateProps, DispatchProps {}

export class Pay extends React.Component<IPayProp> {
  componentDidMount() {
    this.props.getMerchantsEntity(window.location.hash.substring(window.location.hash.indexOf('=') + 1));
  }

  render() {
    const { merchantEntity } = this.props;

    function AmountOnInput() {
      const el = document.getElementById('bonusValue') as HTMLInputElement;
      const els = (document.getElementById('amount') as HTMLInputElement).value;
      el.textContent = String((Number(els) * merchantEntity.rebate) / 100);
    }

    function AlipayOrwechat() {
      const key = (document.getElementById('amount') as HTMLInputElement).value;
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.match(/MicroMessenger/i)) {
        alert('使用的是元积分支付，支付金额是：' + key);
      } else if (userAgent.match(/Alipay/i)) {
        alert('使用的是支付宝付款，支付金额是：' + key);
      } else if (userAgent.match(/Weisen/i)) {
        alert('使用的是微信支付，支付金额是：' + key);
      } else {
        render(Complete);
        // alert('不支持除支付宝，微信，元积分之外的支付方式。');
      }
    }

    return (
      <div className="jh-body">
        <Header isAuthenticated />
        <img src={merchantEntity.merchantphoto} />
        <h6>付款给商家({merchantEntity.concession}%)</h6>
        <p>昵称:{merchantEntity.name}</p>
        <p className={'jh-amount-h6'}>付款金额</p>
        <div>
          <h1>￥</h1>
          <input type="number" id="amount" className={'jh-amount'} onInput={AmountOnInput} />
        </div>
        <Hrmargin />
        <label id="bonusValue" className="jh-integral">
          0
        </label>
        <p>可获得积分:</p>
        <button type="button" onClick={AlipayOrwechat}>
          立即支付
        </button>
      </div>
    );
  }
}

const Hrmargin = userAgent => {
  userAgent = navigator.userAgent.toLowerCase();
  return <hr className={userAgent.match(/iphone/i) ? 'jh-iphone-hr' : 'jh-android-hr'} />;
};

const mapStateToProps = ({ merchant }: IRootState) => ({
  merchantEntity: merchant.entity
});

const mapDispatchToProps = { getMerchantsEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pay);
