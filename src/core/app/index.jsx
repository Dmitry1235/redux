import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router';
import createHashHistory from 'history/createHashHistory';
import Header from '../../components/Header/index';
import Registration from '../../Registration/index';
import Entry from '../../Entry/index';
import Home from '../../Home/index';

const history = createHashHistory();


class App extends Component {
  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/registration" component={Registration} />
            <Route path="/entry" component={Entry} />
            <Route component={Home} />
          </Switch>
        </React.Fragment>
      </Router>);
  }
}

export default App;
