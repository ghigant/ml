import { combineReducers } from 'redux';

import dashboard from './reducers/dashboard';
import editor from './reducers/editor';

const appState = combineReducers({
  dashboard,
  editor
});

export default appState;
