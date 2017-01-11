import {render} from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';

import {default as appState} from 'state';
import {createStore} from 'redux'

const store = createStore(appState);

import {default as Router} from 'components/Routing';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

render(<App />, document.getElementById('viewport'));
