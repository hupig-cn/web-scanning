import './pay.scss';
import React from 'react';
import { connect } from 'react-redux';
import { getMerchantsEntity } from 'app/entities/merchant/merchant/merchant.reducer';
import { IRootState } from 'app/shared/reducers';
import Header from 'app/modules/pay/header';
import { getMyImg } from 'app/entities/basic/files.reducer';
import { queryBalance } from 'app/entities/basic/userassets.reducer';
import { toast } from 'react-toastify';
import { merchantPayment } from 'app/entities/basic/linkuser/linkuser.reducer';

export interface IPayProp extends StateProps, DispatchProps {
  id: string;
  userid: string;
  auth_code: string;
}

export class Pay extends React.Component<IPayProp> {
  state = { file: '', fileContentType: '', id: this.props.id, userid: this.props.userid, auth_code: this.props.auth_code };
  componentDidMount() {
    if (this.state.userid !== '') {
      this.props.queryBalance(this.state.userid);
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
    const key = (document.getElementById('amount') as HTMLInputElement).value;
    if (Number(key) > 0) {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.match(/MicroMessenger/i)) {
        toast.info('暂不支持微信支付');
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
        if (Number(this.props.userassetsEntity.usablebalance) < Number(key)) {
          toast.error('提示：余额不足，更换支付方式？');
        } else {
          toast.info('使用的是元积分支付，支付金额是：' + key);
        }
      } else {
        toast.info('不支持除支付宝，微信，元积分之外的支付方式。');
      }
    }
  };

  render() {
    const { merchantEntity } = this.props;

    function AmountOnInput() {
      const el = document.getElementById('bonusValue') as HTMLInputElement;
      const els = (document.getElementById('amount') as HTMLInputElement).value;
      el.textContent = String((Number(els) * merchantEntity.rebate) / 100);
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
          <button type="button" onClick={this.Payment}>
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

const mapDispatchToProps = { getMerchantsEntity, getMyImg, queryBalance, merchantPayment };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pay);
