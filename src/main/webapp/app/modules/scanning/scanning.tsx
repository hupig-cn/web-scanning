import './scanning.scss';
import React from 'react';
import Pay from '../pay/pay';
import Menu from '../menu/menu';
import Register from '../register/register';

export const ScanningType = () => {
  if (window.location.hash.match(/loc/i)) {
    return (<Menu/>)
  }else if (window.location.hash.match(/share/i)){
    return (<Register />)
  }else{
    return (<Pay />)
  }
};
export default function Scanning() {
  return (
    <div className='jh-body'>
      <ScanningType />
    </div>
  );
}
