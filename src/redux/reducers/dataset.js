import {
  ADD_DATASET
} from '../actions/dataset';

const dataset = (state = [], action) => {
  switch (action.type) {
  case ADD_DATASET:
    return [...action.data];
  default:
    return state;
  }
};

export default dataset;
