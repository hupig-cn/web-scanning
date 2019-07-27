import React from 'react';

export default function PrimarySearchAppBar() {
  function goto() {
    window.history.back();
  }
  return (
    <div>
      <div
        style={{
          height: 35,
          width: '100vw',
          color: '#fffde5',
          backgroundColor: '#fe4365',
          padding: '5px 10px 0px 10px',
          textAlign: 'center',
          zIndex: 1000,
          top: 0
        }}
      >
        <img
          style={{
            float: 'left',
            fill: '#fffde5',
            width: '25px',
            height: '25px'
          }}
          src={'./content/images/round.png'}
          onClick={goto}
        />
        <span style={{ fontSize: '1rem', marginTop: '3px', marginLeft: '2px' }}>圆积分</span>
        <span style={{ float: 'right', width: '5%', height: '5px' }} />
      </div>
    </div>
  );
}
