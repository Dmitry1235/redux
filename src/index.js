import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configurateStore from './core/store';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={configurateStore()}>
    <App/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
