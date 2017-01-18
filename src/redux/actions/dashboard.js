export const INIT_DASHBOARD = 'INIT_DASHBOARD';
export const ADD_DATASET = 'ADD_DATASET';
export const REMOVE_DATASET = 'REMOVE_DATASET';

export function initDasboard(datasets = []) {
  return {
    type: INIT_DASHBOARD,
    datasets
  };
}

export function addDataset(dataset = []) {
  return {
    type: ADD_DATASET,
    dataset
  };
}

export function removeDataset(id) {
  return {
    type: REMOVE_DATASET,
    id
  };
}
