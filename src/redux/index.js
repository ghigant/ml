import { combineReducers } from 'redux';
import dataset from './reducers/dataset';
import editor from './reducers/editor';

const appState = combineReducers({
  dataset,
  editor
});

export default appState;
