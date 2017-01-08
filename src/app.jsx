import ReactDOM from 'react-dom';
import React from 'react';

import {default as Router} from 'components/Routing';
const App = () => (<Router />);

ReactDOM.render(<App />, document.getElementById('viewport'));
