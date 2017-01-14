import {render} from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';

import {default as appState} from 'state';
import {createStore} from 'redux'

import {persistStore, autoRehydrate} from 'redux-persist'

const store = createStore(appState, undefined, autoRehydrate())

persistStore(store, {
  blacklist: ['editor']
});

import {default as Router} from 'components/Routing';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

render(<App />, document.getElementById('viewport'));
