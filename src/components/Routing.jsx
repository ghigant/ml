import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from 'containers/App/App';
import Dashboard from 'containers/Dashboard/Dashboard';
import Editor from 'containers/Editor/Editor';

const Routing = () => ((
  <Router history={hashHistory}>
    <Route path="/" component={Dashboard}></Route>
    <Route path="/editor" component={Editor} />
  </Router>
));

export default Routing;
