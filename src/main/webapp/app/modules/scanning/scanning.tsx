import './scanning.scss';
import React from 'react';
import Pay from '../pay/pay';
import Menu from '../menu/menu';
import MenuDetails from '../menuDetails/menuDetails';
import Register from '../register/register';
import Alipay from '../authorization/alipay';
import Wechat from '../authorization/wechat';
import Info from './info';
import Infos from './infos';
import Errors from './errors';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getSession, registerRandom } from 'app/shared/reducers/authentication';
import {
  queryAlipayUser,
  createUserByScanningMerchant,
  createUserByShareLink,
  queryWeChatUser
} from 'app/entities/basic/linkuser/linkuser.reducer';
import Payt from '../pay/payt';

export interface IScanningProp extends StateProps, DispatchProps {}

export class Scanning extends React.Component<IScanningProp> {
  state = { userid: '', sum: '', order: '' };
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
      } else if (str.length > 1 && str[0].match(/details/i)) {
        return <MenuDetails />;
      } else if (str.length > 1 && str[1].match(/sum/i)) {
        this.setState({
          sum: window.location.search
          .substring(1)
          .split('&')[1]
          .split('=')[1],
          order: window.location.search
          .substring(1)
          .split('&')[2]
          .split('=')[1]
        });
        window.location.replace(
          'http://localhost:9000/?id=20'
        );
      } else if (str[0].match(/articleid/i)) {
        // http://app.yuanscore.com/?articleid=3
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.match(/MicroMessenger/i)) {
          const state = 'Article' + decodeURIComponent(str[0].replace('articleid=', ''));
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
        }
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
          <Infos
            message={
              <span>
                <h3>支付成功</h3>
                恭喜你本次消费，获得<span style={{ color: 'red', fontSize: '1.4rem' }}>{' 商城购物 '}</span>积分。
                <br />
                点击下载
                <a
                  href="http://www.yuanscore.com"
                  style={{
                    color: 'red',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }}
                >
                  (圆积分)
                </a>
                免费兑换海量商品
                <br />
                使用圆积分付款，可获得更多积分
                <br />
                <a href="http://www.yuanscore.com" style={{ color: 'red', textDecoration: 'underline', fontSize: '1.2rem' }}>
                  点击此处下载
                </a>
              </span>
            }
          />
        );
      } else if (str[0].match(/resapp/i)) {
        const userAgent = navigator.userAgent.toLowerCase();
        return decodeURIComponent(str[0].replace('resapp=', '')) === 'coupon' ? (
          <Infos
            message={
              <span>
                <h3>支付成功</h3>
                恭喜你本次消费，获得<span style={{ color: 'red', fontSize: '1.4rem' }}>{' 商城购物 '}</span>积分。
                <br />
                点击下载
                <a
                  href="http://www.yuanscore.com"
                  style={{
                    color: 'red',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }}
                >
                  (圆积分)
                </a>
                免费兑换海量商品
                <br />
                使用圆积分付款，可获得更多积分
                <br />
                <a href="http://www.yuanscore.com" style={{ color: 'red', textDecoration: 'underline', fontSize: '1.2rem' }}>
                  点击此处下载
                </a>
              </span>
            }
          />
        ) : (
          <Infos
            message={
              <span>
                <h3>支付成功</h3>
                恭喜你本次消费
                <br />
                获得
                <span style={{ color: 'red', fontSize: '2rem' }}>{' ' + decodeURIComponent(str[0].replace('resapp=', '')) + ' '}</span>
                个积分
                {userAgent.match(/Weisen/i) ? (
                  <span />
                ) : (
                  <span>
                    <br />
                    点击下载
                    <a
                      href="http://www.yuanscore.com"
                      style={{
                        color: 'red',
                        textDecoration: 'underline',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}
                    >
                      (圆积分)
                    </a>
                    免费兑换海量商品
                    <br />
                    使用圆积分付款，可获得更多积分
                    <br />
                    <a href="http://www.yuanscore.com" style={{ color: 'red', textDecoration: 'underline', fontSize: '1.2rem' }}>
                      点击此处下载
                    </a>
                  </span>
                )}
              </span>
            }
          />
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
          if (this.state.sum !== '') {
            return <Payt id={state.substring(6)} userid="" auth_code="" wechat={this.state.userid} sum={this.state.sum} order={this.state.order} />;
          }
          return this.state.userid ? (
            <Pay id={state.substring(6)} userid="" auth_code="" wechat={this.state.userid} />
          ) : (
            <Pay id={state.substring(6)} userid="" auth_code="" wechat={''} />
          );
        } else if (state.match(/bindingwx/i)) {
          return <Wechat code={decodeURIComponent(str[0].replace('code=', ''))} userid={state.substring(9)} />;
        } else if (state.match(/Article/i)) {
          // tslint:disable-next-line: no-invalid-this
          this.props
            .queryWeChatUser(decodeURIComponent(str[0].replace('code=', '')))
            // @ts-ignore
            .then(wechatuser => {
              if (wechatuser.value.data === '获取微信会员信息失败') {
                return <Info message="获取微信会员信息失败" />;
              } else if (wechatuser.value.data.match(/用户/i)) {
                window.location.replace(
                  'http://www.yuanscore.com/ArticleDeatil.html?deailId=' +
                    state.substring(7) +
                    '&userid=' +
                    wechatuser.value.data.substring(2)
                );
              } else {
                // tslint:disable-next-line: no-invalid-this
                this.props
                  .registerRandom()
                  // @ts-ignore
                  .then(res => {
                    if (!isNaN(res.value.data)) {
                      // tslint:disable-next-line: no-invalid-this
                      this.props.createUserByShareLink(res.value.data, wechatuser.value.data, '微信', state.substring(7));
                      window.location.replace(
                        'http://www.yuanscore.com/ArticleDeatil.html?deailId=' + state.substring(7) + '&userid=' + res.value.data
                      );
                    } else {
                      return <Info message={res.value.data.toString()} />;
                    }
                  });
              }
            });
        }
      } else if (str[0].match(/bindingWeChat/i)) {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.match(/MicroMessenger/i)) {
          const userid = 'bindingwx' + decodeURIComponent(str[1].replace('userid=', ''));
          window.location.replace(
            'https://open.weixin.qq.com/connect/oauth2/authorize?' +
              'appid=wx5450b0124166c23d&' +
              'redirect_uri=http%3A%2F%2Fapp.yuanscore.com%2F&' +
              'response_type=code&' +
              'scope=snsapi_base&' +
              'state=' +
              userid +
              '#wechat_redirect'
          );
        } else {
          return <Info message={<span>请在微信端扫码绑定</span>} />;
        }
      } else if (str[0].match(/payerror/i)) {
        return (
          <Errors
            message={
              <span>
                <h3>支付失败</h3>
                很遗憾，你暂未获得积分
                <br />
                点击下载
                <a
                  href="http://www.yuanscore.com"
                  style={{
                    color: 'red',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }}
                >
                  (圆积分)
                </a>
                免费兑换海量商品
                <br />
                <a href="http://www.yuanscore.com" style={{ color: 'red', textDecoration: 'underline', fontSize: '1.2rem' }}>
                  点击此处下载
                </a>
              </span>
            }
          />
        );
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

const mapDispatchToProps = {
  getSession,
  queryAlipayUser,
  createUserByScanningMerchant,
  createUserByShareLink,
  registerRandom,
  queryWeChatUser
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanning);
