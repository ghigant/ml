export const INIT_EDITOR = 'INIT_EDITOR';
export const ADD_TO_DATASET = 'ADD_TO_DATASET';
export const CLEAR_DATASET = 'CLEAR_DATASET';
export const UPDATE_CLUSTERING = 'UPDATE_CLUSTERING';

export const initEditor = (dataset = [], xScale, yScale, width, height) => ({
  type: INIT_EDITOR,
  dataset,
  xScale,
  yScale,
  width,
  height,
  clustering: null
});

export const updateClustering = (clusters = null) => {
  return {
    type: UPDATE_CLUSTERING,
    clustering: clusters
  };
};

export const addPointToDataset = (point = []) => ({
  type: ADD_TO_DATASET,
  point
});

export const clearDataset = () => {
  return {
    type: CLEAR_DATASET
  };
}
