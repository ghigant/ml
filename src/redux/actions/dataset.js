export const ADD_DATASET = 'ADD_DATASET';

export const addDataset = (dataset = []) => {
  return {
    type: ADD_DATASET,
    data: dataset
  };
};
