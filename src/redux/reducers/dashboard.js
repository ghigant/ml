import shortid from 'shortid';

import {
  INIT_DASHBOARD,
  ADD_DATASET
} from '../actions/dashboard';

import {dashboard as initialState} from '../initialState';

const dashboard = (state = initialState, action) => {
  switch (action.type) {

  case INIT_DASHBOARD:
    return Object.assing({}, state, {
      datasets: action.datasets || []
    });

  case ADD_DATASET: {
    return Object.assign({}, state, {
      datasets: [...state.datasets, {
        id: shortid.generate(),
        data: action.dataset
      }]
    });
  }

  default:
    return state;
  }
}

export default dashboard;
