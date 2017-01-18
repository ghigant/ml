import React from 'react';
import {Router, Route} from 'react-router';

// import App from 'containers/App/App';
import Dashboard from 'containers/Dashboard/Dashboard';
import Editor from 'containers/Editor';

const Routing = ({history}) => ((
  <Router history={history}>
    <Route path="/" component={Dashboard}></Route>
    <Route path="/editor" component={Editor} />
    <Route path="/editor/:id" component={Editor} />
  </Router>
));

Routing.propTypes = {
  history: React.PropTypes.object
};

export default Routing;
