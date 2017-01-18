import {render} from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';


import {default as appState} from 'state';
import {createStore} from 'redux'

import {persistStore, autoRehydrate} from 'redux-persist'
import {hashHistory} from 'react-router';

import {default as Router} from 'components/Routing';

const store = createStore(appState, undefined, autoRehydrate());

persistStore(store, {
  blacklist: ['editor']
});

const App = () => (
  <Provider store={store}>
    <Router history={hashHistory}/>
  </Provider>
);

render(<App />, document.getElementById('viewport'));
