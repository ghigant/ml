export const INIT_EDITOR = 'INIT_EDITOR';
export const ADD_TO_DATASET = 'ADD_TO_DATASET';
export const UPDATE_CLUSTERING = 'UPDATE_CLUSTERING';

export const initEditor = (dataset = [], xScale, yScale, width, height) => ({
  type: INIT_EDITOR,
  dataset,
  xScale,
  yScale,
  width,
  height
});

export const updateClustering = (clusters) => {
  return {
    type: UPDATE_CLUSTERING,
    clustering: clusters
  };
};

export const addPointToDataset = (point = []) => ({
  type: ADD_TO_DATASET,
  point
});
