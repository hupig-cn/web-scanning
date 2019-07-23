import './pay.scss';
import React from 'react';
import { connect } from 'react-redux';
import { getMerchantsEntity } from 'app/entities/merchant/merchant/merchant.reducer';
import { IRootState } from 'app/shared/reducers';
import Header from 'app/modules/pay/header';
import { getMyImg } from 'app/entities/basic/files.reducer';
import { queryBalance } from 'app/entities/basic/userassets.reducer';
import { toast } from 'react-toastify';

export interface IPayProp extends StateProps, DispatchProps {
  id: string;
  userid: string;
}

export class Pay extends React.Component<IPayProp> {
  state = { file: '', fileContentType: '' };
  componentDidMount() {
    if (this.props.userid !== '') {
      this.props.queryBalance(this.props.userid);
    }
    this.props
      .getMerchantsEntity(this.props.id)
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

  render() {
    const { merchantEntity, userassetsEntity } = this.props;

    function AmountOnInput() {
      const el = document.getElementById('bonusValue') as HTMLInputElement;
      const els = (document.getElementById('amount') as HTMLInputElement).value;
      el.textContent = String((Number(els) * merchantEntity.rebate) / 100);
    }

    function Payment() {
      const key = (document.getElementById('amount') as HTMLInputElement).value;
      if (Number(userassetsEntity.usablebalance) - Number(key) < 0) {
        toast.info('提示：余额不足，更换支付方式？');
      }
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
    }

    return (
      <div className="jh-body">
        <div style={{ width: '80%', marginLeft: '10%' }}>
          <Header isAuthenticated />
          <img src={this.state.fileContentType ? `data:${this.state.fileContentType};base64,${this.state.file}` : null} />
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
          <button type="button" onClick={Payment}>
            立即支付
          </button>
        </div>
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

const mapDispatchToProps = { getMerchantsEntity, getMyImg, queryBalance };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pay);
