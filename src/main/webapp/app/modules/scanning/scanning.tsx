import './scanning.scss';
import React from 'react';
import Pay from '../pay/pay';
import Menu from '../menu/menu';
import Register from '../register/register';
import Alipay from '../authorization/alipay';
import Info from './info';
import { connect } from 'react-redux';
import { getSessionRE } from 'app/shared/reducers/authentication';
import { queryAlipayUser, createUserByScanningMerchant } from 'app/entities/basic/linkuser/linkuser.reducer';

export interface IScanningProp extends StateProps, DispatchProps {}

export const ScanningType = () => {
  const url = location.search;
  // tslint:disable-next-line: triple-equals
  if (url.indexOf('?') != -1) {
    const str = url.substr(1).split('&');
    if (str[0].match(/app_id/i)) {
      let state = decodeURIComponent(str[3].replace('state=', ''));
      if (typeof state === 'number' && state !== Infinity && !isNaN(state)) {
        return <Alipay auth_code={decodeURIComponent(str[4].replace('auth_code=', ''))} state={state} />;
      } else if (state.match(/Alipay/i)) {
        //接到之后发送请求，查询用户在不在
        this.props.queryAlipayUser(decodeURIComponent(str[4].replace('auth_code=', ''))).then(alipeyuser => {
          if (alipeyuser.value.data === '获取支付宝会员信息失败') {
            return <Info message="获取支付宝会员信息失败" />;
          } else if (alipeyuser.value.data !== '用户存在') {
            //不再就去login创建
            this.props.registerRandom().then(res => {
              if (!isNaN(res.value.data)) {
                //创建完拿到id，拿着id去添加用户附加信息，推荐人，资产，绑定账户
                this.props.createUserByScanningMerchant(res.value.data, state.substring(6), alipeyuser.value.data, '支付宝');
              } else {
                return <Info message={res.value.data.toString()} />;
              }
            });
          }
        });
        //操作完，调用付款
        return <Pay id={state.substring(6)} userid="" />;
        //上边是付款页面
      } else if (state.match(/WeChat/i)) {
        //微信回调
      } else {
        //参数错误
      }
    } else if (str.length > 1 && str[1].match(/share/i)) {
      return <Register id={decodeURIComponent(str[0].replace('id=', ''))} name={decodeURIComponent(str[1].replace('share=', ''))} />;
    } else if (str.length > 1 && str[1].match(/loc/i)) {
      return <Menu />;
    } else if (str[0].match(/id/i)) {
      let userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.match(/MicroMessenger/i)) {
        return <Info message="暂不支持微信支付！" />;
      } else if (userAgent.match(/Alipay/i)) {
        let state = 'Alipay' + decodeURIComponent(str[0].replace('id=', '')); //先拼接支付+商户id
        window.location.replace(
          //然后跳转授权
          'alipays://platformapi/startapp?' +
            'appId=20000067&' +
            'url=https%3A%2F%2Fopenauth.alipay.com%2Foauth2%2FpublicAppAuthorize.htm%3F' +
            'app_id%3D2019062565651444%26' +
            'scope%3Dauth_base%26' +
            'redirect_uri%3Dhttp%3A%2F%2Fapp.yuanscore.com%3A8080%26' +
            'state%3D' +
            state
        );
      } else if (userAgent.match(/Weisen/i)) {
        this.props
          .getSessionRE()
          // @ts-ignore
          .then(valueI => {
            valueI.payload.then(valueII => {
              if (valueII.data.id < 1) {
                return <Info message="您还没有登陆，请先登陆客户端在进行付款。" />;
              } else {
                return <Pay id={decodeURIComponent(str[0].replace('id=', ''))} userid={valueII.data.id} />;
              }
            });
          });
      } else {
        return <Info message="暂不支持当前支付方式，下载《圆积分》APP，支付领奖品！" />;
      }
    }
  }
};
export class Scanning extends React.Component<IScanningProp> {
  render() {
    return (
      <div className="jh-body">
        <ScanningType />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = { getSessionRE, queryAlipayUser, createUserByScanningMerchant };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanning);
