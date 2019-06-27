import './scanning.scss';
import React from 'react';
import Pay from '../pay/pay';
import Menu from '../menu/menu';
export const ScanningType = () => (window.location.hash.match(/loc/i) ? <Menu /> : <Pay />);
export default function Scanning() {
  return (
    <div>
      <ScanningType />
    </div>
  );
}
