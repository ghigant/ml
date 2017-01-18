import {
  INIT_DASHBOARD,
  ADD_DATASET,
  REMOVE_DATASET,
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
        id: action.id,
        data: action.dataset
      }]
    });
  }
  case REMOVE_DATASET:
    return  Object.assign({}, state, {
      datasets: state.datasets.filter(set => set.id !== action.id)
    });
  default:
    return state;
  }
}

export default dashboard;
