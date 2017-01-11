import {omit} from 'lodash';

import {
  INIT_EDITOR
} from '../actions/editor';

import {editor as initialState} from '../initialState';

const editor = (state = initialState, action) => {
  switch (action.type) {
  case INIT_EDITOR:
    return Object.assign(state, omit(action, 'type'));
  case 'UPDATE_DATASET':
    return state;
  default:
    return state;
  }
}

export default editor;
