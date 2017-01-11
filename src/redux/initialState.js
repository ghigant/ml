import {scaleLinear} from 'services/util';

export const editor = {
  dataset: [],
  xScale: scaleLinear(),
  yScale: scaleLinear([10, 0])
};

// export {{editor} as default};
