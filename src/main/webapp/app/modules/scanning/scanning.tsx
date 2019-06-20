import './scanning.scss';
import React from 'react';
import { connect } from 'react-redux';
import { getMerchantsEntity } from 'app/entities/merchant/merchant/merchant.reducer';
import { RouteComponentProps } from 'react-router';
import { IRootState } from 'app/shared/reducers';

export interface IScanningProp extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const Getmerchantid = merchantid => {
  merchantid = window.location.hash;
  merchantid = merchantid.substring(1, merchantid.length);
  return (
    merchantid
  );
};

export class Scanning extends React.Component<IScanningProp> {
  componentDidMount() {
    this.props.getMerchantsEntity(Number(Getmerchantid('')));
  }

  Calculation(proportion) {
    const { merchantEntity } = this.props;
    return (
      proportion * merchantEntity.rebate / 100
    );
  }

  render() {
    const { merchantEntity } = this.props;
    return (
      <div className="jh-body">
        <img src={merchantEntity.merchantphoto}/>
        <h6>付款给商家({merchantEntity.concession}%)</h6>
        <p>昵称:{merchantEntity.name}</p>
        <p className={'jh-amount-h6'}>付款金额</p>
        <div>
          <h1>￥</h1>
          <input type="number" id = "amount" className={'jh-amount'} onInput={() => {
            const el = document.getElementById('bonusvalue') as HTMLInputElement;
            const els = (document.getElementById('amount') as HTMLInputElement).value;
            el.textContent = String(this.Calculation(els));
          }}/>
        </div>
        <Hrmargin />
        <label id = "bonusvalue" className = "jh-integral" >0</label>
        <p>可获得积分:</p>
        <button type="button" onClick={() => {
          const els = (document.getElementById('amount') as HTMLInputElement).value;
          Alipayorwechat(els);
        }}>立即支付</button>
      </div>
    );
  }
}

const Alipayorwechat = key => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.match(/MicroMessenger/i)) {
    alert('使用的是微信支付，支付金额是：' + key);
  } else if (userAgent.match(/Alipay/i)) {
    alert('使用的是支付宝付款，支付金额是：' + key);
  } else if (userAgent.match(/Weisen/i)) {
    alert('使用的是元积分支付，支付金额是：' + key);
  } else {
    alert('不支持除支付宝，微信，元积分之外的支付方式。');
  }
};

const Hrmargin = userAgent => {
  userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.match(/iphone/i)) {
    return (
      <hr className="jh-iphone-hr" />
    );
  } else {
    return(
      <hr className="jh-android-hr" />
    );
  }
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
)(Scanning);
