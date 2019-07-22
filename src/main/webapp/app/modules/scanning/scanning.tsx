import './scanning.scss';
import React from 'react';
import Pay from '../pay/pay';
import Menu from '../menu/menu';
import Register from '../register/register';
import Alipay from '../authorization/alipay';

export const ScanningType = () => {
  const url = location.search;
  // tslint:disable-next-line: triple-equals
  if (url.indexOf('?') != -1) {
    const str = url.substr(1).split('&');
    if (str.length === 1) {
      return <Pay id={decodeURIComponent(str[0].replace('id=', ''))} />;
    } else if (str.length === 2 && str[1].match(/share/i)) {
      return <Register id={decodeURIComponent(str[0].replace('id=', ''))} name={decodeURIComponent(str[1].replace('share=', ''))} />;
    } else if (str.length === 2 && str[1].match(/loc/i)) {
      return <Menu />;
    } else {
      return (
        <Alipay auth_code={decodeURIComponent(str[4].replace('auth_code=', ''))} state={decodeURIComponent(str[3].replace('state=', ''))} />
      );
    }
  }
};
export default function Scanning() {
  return (
    <div className="jh-body">
      <ScanningType />
    </div>
  );
}
