import React from 'react';

export default function LongMenu() {
  return (
    <div>
      <div
        style={{
          width: '100%',
          position: 'fixed',
          top: '40px',
          zIndex: 1000
        }}
      >
        <img style={{ width: '100%', height: '65px' }} src="./content/images/adv.png" />
      </div>
      <div style={{ height: '45px' }} />
    </div>
  );
}
