import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import Registration from './Registration/index';
import Entry from './Entry/index'
import registerServiceWorker from './registerServiceWorker';
import configurateStore from './core/store';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router';
import createHashHistory from 'history/createHashHistory';

const history = createHashHistory();

ReactDOM.render(
  <Provider store={configurateStore()}>
    <Router history={history}>
      <Switch>
        <Route exact path="/home" component={App}/>
        <Route exact path="/registration" component={Registration}/>
        <Route exact path="/entry" component={Entry}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
