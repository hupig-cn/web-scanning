import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import initStore from './config/store';
import { registerLocale } from './config/translation';
import AppComponent from './app';

const store = initStore();
registerLocale(store);

const rootEl = document.getElementById('root');

const render = Component =>
  ReactDOM.render(
    <// @ts-ignore
    Provider
      store={store}
    >
      <Component />
    </Provider>,
    rootEl
  );

render(AppComponent);
