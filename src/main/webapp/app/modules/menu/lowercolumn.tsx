import React from 'react';

export const titleName = () => {
  return '￥12.00';
};

export default function LongMenu() {
  function goBack() {
    history.go(-1);
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0px',
        zIndex: 1000,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.80)',
        height: '52px',
        textAlign: 'center'
      }}
    >
      <span
        onClick={goBack}
        style={{
          float: 'right',
          backgroundColor: '#fe4365',
          color: '#fffde5',
          padding: '15px 25px 15px 25px'
        }}
      >
        提交订单
      </span>
      <img
        style={{
          float: 'left',
          width: '30px',
          height: '30px',
          margin: '8px 5px 0px 15px'
        }}
        src="./content/images/num.png"
      />
      <span
        style={{
          color: '#fffde5',
          backgroundColor: '#fe4365',
          float: 'left',
          width: '20px',
          height: '20px',
          borderRadius: '50px',
          fontSize: '0.1em',
          position: 'absolute',
          left: '35px',
          fontFamily: 'SimHei'
        }}
      >
        2
      </span>
      <h5
        style={{
          color: '#fffde5',
          marginTop: '15px',
          fontSize: '1.05rem',
          float: 'left'
        }}
      >
        {titleName()}
      </h5>
      <div style={{ height: '48px' }} />
    </div>
  );
}
