import './scanning.scss';
import React from 'react';
import Pay from '../pay/pay';
import Menu from '../menu/menu';
import Register from '../register/register';
import Alipay from '../authorization/alipay';
import Info from './info';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getSession, registerRandom } from 'app/shared/reducers/authentication';
import { queryAlipayUser, createUserByScanningMerchant } from 'app/entities/basic/linkuser/linkuser.reducer';

export interface IScanningProp extends StateProps, DispatchProps {}

export class Scanning extends React.Component<IScanningProp> {
  componentDidMount() {
    this.props.getSession();
  }
  ScanningType = () => {
    const url = location.search;
    // tslint:disable-next-line: triple-equals
    if (url.indexOf('?') != -1) {
      const str = url.substr(1).split('&');
      if (str[0].match(/app_id/i)) {
        const state = decodeURIComponent(str[3].replace('state=', ''));
        if (state.match(/Alipay/i)) {
          let userid = '0';
          // tslint:disable-next-line: no-invalid-this
          this.props
            .queryAlipayUser(decodeURIComponent(str[4].replace('auth_code=', '')))
            // @ts-ignore
            .then(alipeyuser => {
              if (alipeyuser.value.data === '获取支付宝会员信息失败') {
                return <Info message="获取支付宝会员信息失败" />;
              } else if (alipeyuser.value.data.match(/用户存在/i)) {
                userid = alipeyuser.value.data.substring(4);
              } else {
                // tslint:disable-next-line: no-invalid-this
                this.props
                  .registerRandom()
                  // @ts-ignore
                  .then(res => {
                    if (!isNaN(res.value.data)) {
                      // tslint:disable-next-line: no-invalid-this
                      this.props.createUserByScanningMerchant(res.value.data, alipeyuser.value.data, '支付宝');
                      userid = res.value.data;
                    } else {
                      return <Info message={res.value.data.toString()} />;
                    }
                  });
              }
            });
          return <Pay id={state.substring(6)} userid={userid} />;
        } else if (state.match(/WeChat/i)) {
        } else if (Number(state) > 0) {
          return <Alipay auth_code={decodeURIComponent(str[4].replace('auth_code=', ''))} state={state} />;
        } else {
        }
      } else if (str.length > 1 && str[1].match(/share/i)) {
        return <Register id={decodeURIComponent(str[0].replace('id=', ''))} name={decodeURIComponent(str[1].replace('share=', ''))} />;
      } else if (str.length > 1 && str[1].match(/loc/i)) {
        return <Menu />;
      } else if (str[0].match(/id/i)) {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.match(/MicroMessenger/i)) {
          return <Info message="暂不支持微信支付！" />;
        } else if (userAgent.match(/Alipay/i)) {
          const state = 'Alipay' + decodeURIComponent(str[0].replace('id=', ''));
          window.location.replace(
            'alipays://platformapi/startapp?' +
              'appId=20000067&' +
              'url=https%3A%2F%2Fopenauth.alipay.com%2Foauth2%2FpublicAppAuthorize.htm%3F' +
              'app_id%3D2019061965597545%26' +
              'scope%3Dauth_base%26' +
              'redirect_uri%3Dhttp%3A%2F%2Fapp.yuanscore.com%26' +
              'state%3D' +
              state
          );
        } else if (userAgent.match(/Weisen/i)) {
          const { account } = this.props;
          if (!(account && account.login)) {
            return <Pay id={decodeURIComponent(str[0].replace('id=', ''))} userid={account.id} />;
          } else {
            return (
              <Info
                message={
                  <span>
                    您还没有登陆，点击<a href="http://app.yuanscore.com:8081/login">《登陆》</a>客户端后在进行付款。
                  </span>
                }
              />
            );
          }
        } else {
          return (
            <Info
              message={
                <span>
                  暂不支持当前支付方式，点击下载<a href="http://www.yuanscore.com">《圆积分》</a>APP，支付享好礼！
                </span>
              }
            />
          );
        }
      } else if (str[0].match(/result/i)) {
        return <div> 支付完成之后的回掉地址，订单号是：{decodeURIComponent(str[0].replace('result=', ''))}</div>;
      }
    }
  };

  render() {
    return (
      <div className="jh-body">
        <this.ScanningType />
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, queryAlipayUser, createUserByScanningMerchant, registerRandom };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanning);
