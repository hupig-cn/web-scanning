import './header.scss';

import React from 'react';
import { Navbar } from 'reactstrap';

export interface IHeaderProps {}

const Alipayorwechat = () => {
  let userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.match(/MicroMessenger/i)) {
    userAgent = '微信支付';
  } else if (userAgent.match(/Alipay/i)) {
    userAgent = '支付宝付款';
  } else if (userAgent.match(/Weisen/i)) {
    userAgent = '元积分支付';
  } else {
    userAgent = '其他';
  }
  return userAgent;
};

export default class Header extends React.Component<IHeaderProps> {
  render() {
    function goBack() {
      history.go(-1);
    }

    return (
      <div id="app-header">
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <h4 onClick={goBack}>
            <img
              src="./content/images/back.png"
              style={{
                width: '24px',
                height: '24px'
              }}
            />
          </h4>
          <h5 className="jh-navbar-h4">{Alipayorwechat()}</h5>
        </Navbar>
        <div style={{ height: '50px' }} />
      </div>
    );
  }
}
