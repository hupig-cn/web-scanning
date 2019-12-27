import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getSession, registerRandom } from 'app/shared/reducers/authentication';
import Titles from './titles';
import Adv from './adv';
import Content from './content';
import {
  queryAlipayUser,
  createUserByScanningMerchant,
  createUserByShareLink,
  queryWeChatUser
} from 'app/entities/basic/linkuser/linkuser.reducer';
import Info from '../scanning/info';

export interface IMenuProp extends StateProps, DispatchProps {}

export class Menu extends React.Component<IMenuProp> {
  state = {
    iocId: window.location.search.substring(1).split('&')[1].split('=')[1],
<<<<<<< HEAD
    merchatid: window.location.search.substring(1).split('&')[0].split('=')[1],
    userid:"",
    typecc:"0",
    ac:"",
=======
    merchantid: window.location.search.substring(1).split('&')[0].split('=')[1]
>>>>>>> branch 'code' of git@github.com:hupig-cn/web-scanning.git
  };
  componentDidMount() {
    this.props.getSession();
    const url = location.search;
    const str = url.substr(1).split('&');
    const userAgent = navigator.userAgent.toLowerCase();

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
          this.setState({ typecc: "1" ,ac:decodeURIComponent(str[4].replace('auth_code=', ''))});
      }
    }
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
              this.setState({ userid: wechatuser.value.data.substring(2),typecc: "3" });
            } else {
              // tslint:disable-next-line: no-invalid-this
              this.props
                .registerRandom()
                // @ts-ignore
                .then(res => {
                  if (!isNaN(res.value.data)) {
                    // tslint:disable-next-line: no-invalid-this
                    this.props.createUserByScanningMerchant(res.value.data, wechatuser.value.data, '微信');
                    this.setState({ userid: res.value.data,typecc: "3"});
                  } else {
                    return <Info message={res.value.data.toString()} />;
                  }
                });
            }
          });
      } 
    }
  }

  render() {
    if (this.state.typecc === "0") {
      return (
     
        <div style={{ backgroundColor: '#f2f2f2', width: '100%' }}>
          <Titles />
             <Adv />
            <Content iocId={this.state.iocId} merchantId={this.state.merchatid}  userid="" auth_code="" wechat="" typecc={this.state.typecc}/>
        </div>
      );
    }else if (this.state.typecc === "1") {
      return (
     
        <div style={{ backgroundColor: '#f2f2f2', width: '100%' }}>
          <Titles />
             <Adv />
            <Content iocId={this.state.iocId} merchantId={this.state.merchatid}  userid="" auth_code={this.state.ac} wechat={this.state.userid} typecc={this.state.typecc} />
        </div>
      );
    }else if (this.state.typecc === "3") {
      return (
     
        <div style={{ backgroundColor: '#f2f2f2', width: '100%' }}>
          <Titles />
             <Adv />
             
            <Content iocId={this.state.iocId} merchantId={this.state.merchatid} userid="" auth_code="" wechat={this.state.userid} typecc={this.state.typecc}/>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, queryAlipayUser, createUserByScanningMerchant, createUserByShareLink, queryWeChatUser,
  registerRandom };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
