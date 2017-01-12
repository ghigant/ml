import {scaleLinear} from 'services/util';

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
  height: defaultHeight
};
