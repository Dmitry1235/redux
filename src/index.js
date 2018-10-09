import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './core/app/index';
import registerServiceWorker from './registerServiceWorker';
import configurateStore from './core/store';


ReactDOM.render(
  <Provider store={configurateStore()}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
