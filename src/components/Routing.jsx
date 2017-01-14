import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

// import App from 'containers/App/App';
import Dashboard from 'containers/Dashboard/Dashboard';
import Editor from 'containers/Editor';

const Routing = () => ((
  <Router history={hashHistory}>
    <Route path="/" component={Dashboard}></Route>
    <Route path="/editor" component={Editor} />
    <Route path="/editor/:id" component={Editor} />
  </Router>
));

export default Routing;
