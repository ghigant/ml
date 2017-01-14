import {scaleLinear} from 'services/util';

import {
  default as DendrogramConfig
} from 'config/dendrogram';

export const defaultDomain = [0, 10]
export const defaultWidth = 400;
export const defaultHeight = 400;
export const defaultPadding = 30;

export const editor = {
  dataset: [],
  xScale: scaleLinear(
    defaultDomain,
    [defaultPadding, defaultWidth - defaultPadding]
  ),
  yScale: scaleLinear(
    defaultDomain.reverse(),
    [defaultPadding, defaultHeight - defaultPadding]
  ),
  width: defaultWidth,
  height: defaultHeight,
  clustering: null
};

export const dendrogram = Object.assign({
  xScale: scaleLinear(),
  yScale: scaleLinear()
}, DendrogramConfig);

export const dashboard = {
  datasets: []
};
