import React from 'react';
import initStore from 'app/config/store';
import { registerLocale } from 'app/config/translation';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

export default function complete() {
  const store = initStore();
  registerLocale(store);

  const rootEl = document.getElementById('root');

  const render = Component =>
    ReactDOM.render(
        <Component />,
      rootEl
    );

  function goBack() {
    history.go(0);
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
          支付成功
        </h5>
      </div>
      <div
        style={{
          backgroundColor: 'rgba(255,253,229,0)',
          height: '80px',
          textAlign: 'center',
          padding: '17px',
          width: '100%',
          position: 'fixed',
          top: '140px',
          zIndex: 1000
        }}
      >
        <img src="./content/images/success.png" />
        <h4>恭喜你支付成功</h4>
      </div>
      <div
        style={{
          textAlign: 'center',
          padding: '17px',
          width: '100%',
          position: 'fixed',
          top: '400px',
          zIndex: 1000
        }}
      >
        <button
          type="button"
          style={{
            backgroundColor: '#fe4365',
            width: '80%',
            border: 'none',
            color: 'white',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            marginTop: '5px',
            height: '45px',
            borderRadius: '4px'
          }}
          onClick={goBack}
        >
          查看订单详情
        </button>
      </div>
      <div style={{ height: '40px' }} />
    </div>
  );
}
