import * as scale from 'd3-scale';
import {map, min, max} from 'lodash';

export function isFileApiEnabled() {
  return !!(window.File && window.FileReader && window.FileList && window.Blob);
}

export function scaleLinear(domain = [0, 10], range = [0, 10]) {
  return scale.scaleLinear().domain(domain).range(range);
}


export function getDomainsFromData(dataset) {
  let xDomain = [0, 0], yDomain = [0, 0];

  map(dataset, (point) => {
    xDomain[0] = min([xDomain[0], point[0]]);
    xDomain[1] = max([xDomain[1], point[0]]);
    yDomain[0] = min([yDomain[0], point[1]]);
    yDomain[1] = max([yDomain[1], point[1]]);
  });

  xDomain = [Math.floor(xDomain[0]), Math.ceil(xDomain[1])];
  yDomain = [Math.floor(yDomain[0]), Math.ceil(yDomain[1])];

  return {xDomain, yDomain};
}

export function getScreenSize() {
  return document.body.clientWidth;
}

export function getBoardSize(xDomain, yDomain) {
  let width = 400, height = 400;
  const xUnits = max(xDomain) - min(xDomain);
  const yUnits = max(yDomain) - min(yDomain);
  const diff = Math.abs(xUnits - yUnits);

  if (xUnits > yUnits) {
    width += diff * (width / xUnits);
  } else if (xUnits < yUnits) {
    height = diff * (height / yUnits);
  }

  if(xUnits === diff) {
    width = 1200;
    height = 60;
  }
  return { width, height };
}