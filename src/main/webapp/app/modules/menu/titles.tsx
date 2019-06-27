import React from 'react';

export const titleName = () => '某某商家';

export default function LongMenu() {
  function goBack() {
    history.go(-1);
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: '#fe4365',
          height: '40px',
          textAlign: 'center',
          padding: '7px',
          width: '100%',
          position: 'fixed',
          top: '0px',
          zIndex: 1000
        }}
      >
        <span onClick={goBack} style={{ float: 'left' }}>
          <img
            src="./content/images/back.png"
            style={{
              width: '24px',
              height: '24px'
            }}
          />
        </span>
        <h5
          style={{
            color: '#fffde5',
            marginTop: '3px',
            fontSize: '1.05rem'
          }}
        >
          {titleName}
        </h5>
      </div>
      <div style={{ height: '40px' }} />
    </div>
  );
}
