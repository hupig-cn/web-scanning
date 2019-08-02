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
import { queryAlipayUser, createUserByScanningMerchant, queryWeChatUser } from 'app/entities/basic/linkuser/linkuser.reducer';

export interface IScanningProp extends StateProps, DispatchProps {}

export class Scanning extends React.Component<IScanningProp> {
  state = { userid: '' };
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
          // tslint:disable-next-line: no-invalid-this
          this.props
            .queryAlipayUser(decodeURIComponent(str[4].replace('auth_code=', '')))
            // @ts-ignore
            .then(alipeyuser => {
              if (alipeyuser.value.data === '获取支付宝会员信息失败') {
                return <Info message="获取支付宝会员信息失败" />;
              } else if (alipeyuser.value.data !== '用户存在') {
                // tslint:disable-next-line: no-invalid-this
                this.props
                  .registerRandom()
                  // @ts-ignore
                  .then(res => {
                    if (!isNaN(res.value.data)) {
                      // tslint:disable-next-line: no-invalid-this
                      this.props.createUserByScanningMerchant(res.value.data, alipeyuser.value.data, '支付宝');
                    } else {
                      return <Info message={res.value.data.toString()} />;
                    }
                  });
              }
            });
          return <Pay id={state.substring(6)} userid="" auth_code={decodeURIComponent(str[4].replace('auth_code=', ''))} wechat="" />;
        } else if (Number(state) > 0) {
          return <Alipay auth_code={decodeURIComponent(str[4].replace('auth_code=', ''))} state={state} />;
        }
      } else if (str.length > 1 && str[1].match(/share/i)) {
        return <Register id={decodeURIComponent(str[0].replace('id=', ''))} name={decodeURIComponent(str[1].replace('share=', ''))} />;
      } else if (str.length > 1 && str[1].match(/loc/i)) {
        return <Menu />;
      } else if (str[0].match(/id/i)) {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.match(/MicroMessenger/i)) {
          const state = 'WeChat' + decodeURIComponent(str[0].replace('id=', ''));
          window.location.replace(
            'https://open.weixin.qq.com/connect/oauth2/authorize?' +
              'appid=wx5450b0124166c23d&' +
              'redirect_uri=http%3A%2F%2Fapp.yuanscore.com%2F&' +
              'response_type=code&' +
              'scope=snsapi_base&' +
              'state=' +
              state +
              '#wechat_redirect'
          );
        } else if (userAgent.match(/Alipay/i)) {
          const state = 'Alipay' + decodeURIComponent(str[0].replace('id=', ''));
          window.location.replace(
            'alipays://platformapi/startapp?' +
              'appId=20000067&' +
              'url=https%3A%2F%2Fopenauth.alipay.com%2Foauth2%2FpublicAppAuthorize.htm%3F' +
              'app_id%3D2019031963563747%26' +
              'scope%3Dauth_base%26' +
              'redirect_uri%3Dhttp%3A%2F%2Fapp.yuanscore.com%26' +
              'state%3D' +
              state
          );
        } else if (userAgent.match(/Weisen/i)) {
          const { account } = this.props;
          if (account && account.login) {
            return <Pay id={decodeURIComponent(str[0].replace('id=', ''))} userid={account.id} auth_code="" wechat="" />;
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
        return (
          <Info
            message={
              <span>
                支付完成，点击下载<a href="http://www.yuanscore.com">《圆积分》</a>APP，积分兑好礼！
              </span>
            }
          />
        );
      } else if (str[0].match(/resapp/i)) {
        return decodeURIComponent(str[0].replace('resapp=', '')) === 'coupon' ? (
          <Info message={<span>支付完成。</span>} />
        ) : (
          <Info message={<span>支付完成，获得({decodeURIComponent(str[0].replace('resapp=', ''))})积分。</span>} />
        );
      } else if (str[0].match(/code/i)) {
        const state = decodeURIComponent(str[1].replace('state=', ''));
        if (state.match(/WeChat/i)) {
          // tslint:disable-next-line: no-invalid-this
          this.props
            .queryWeChatUser(decodeURIComponent(str[0].replace('code=', '')))
            // @ts-ignore
            .then(wechatuser => {
              if (wechatuser.value.data === '获取微信会员信息失败') {
                return <Info message="获取微信会员信息失败" />;
              } else if (wechatuser.value.data.match(/用户/i)) {
                this.setState({ userid: wechatuser.value.data.substring(2) });
              } else {
                // tslint:disable-next-line: no-invalid-this
                this.props
                  .registerRandom()
                  // @ts-ignore
                  .then(res => {
                    if (!isNaN(res.value.data)) {
                      // tslint:disable-next-line: no-invalid-this
                      this.props.createUserByScanningMerchant(res.value.data, wechatuser.value.data, '微信');
                      this.setState({ userid: res.value.data });
                    } else {
                      return <Info message={res.value.data.toString()} />;
                    }
                  });
              }
            });
          return <Pay id={state.substring(6)} userid="" auth_code="" wechat={this.state.userid} />;
        }
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

const mapDispatchToProps = { getSession, queryAlipayUser, createUserByScanningMerchant, registerRandom, queryWeChatUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanning);
