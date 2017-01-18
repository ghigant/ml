import { omit } from 'lodash';

import {
  INIT_EDITOR,
  ADD_TO_DATASET,
  UPDATE_CLUSTERING,
  CLEAR_DATASET
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

  case UPDATE_CLUSTERING:
    return Object.assign({}, state, {
      clustering: action.clustering
    });

  case CLEAR_DATASET:
    return Object.assign({}, state, {
      dataset: []
    });

  default:
    return state;
  }
}

export default editor;
