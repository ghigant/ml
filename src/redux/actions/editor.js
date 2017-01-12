export const INIT_EDITOR = 'INIT_EDITOR';
export const ADD_TO_DATASET = 'ADD_TO_DATASET';
/**
 * [initEditor description]
 * @param  {Array}  [dataset=[]] [description]
 * @param  {[type]} xScale       [description]
 * @param  {[type]} yScale       [description]
 * @return {[type]}              [description]
 */
export const initEditor = (dataset = [], xScale, yScale, width, height) => ({
  type: INIT_EDITOR,
  dataset,
  xScale,
  yScale,
  width,
  height
});

export const addPointToDataset = (point = []) => ({
  type: 'ADD_TO_DATASET',
  point: point
});
