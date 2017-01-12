import {omit} from 'lodash';

import {
  INIT_EDITOR,
  ADD_TO_DATASET
} from '../actions/editor';

import {editor as initialState} from '../initialState';

const editor = (state = initialState, action) => {
  switch (action.type) {

  case INIT_EDITOR:
    return Object.assign({}, state, omit(action, 'type'));

  case ADD_TO_DATASET: {
    const dataset = [...state.dataset, action.point];
    return Object.assign({}, state, {
      dataset
    });
  }

  case 'UPDATE_DATASET':
    return state;
  default:
    return state;
  }
}

export default editor;
