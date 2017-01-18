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
  let width = 340, height = 340;

  const xUnits = max(xDomain) - min(xDomain);
  const yUnits = max(yDomain) - min(yDomain);

  const appRatio = 1140 / 340; // 3
  const dataRatio = xUnits / yUnits;

  if (dataRatio !== 1) {
    if (dataRatio > appRatio) {
      const unitSize = 1140 / xUnits;
      height = isNaN(unitSize) ? 0 : unitSize * yUnits;
      width = 1140;

    } else if(dataRatio < appRatio) {
      const unitSize = 340 / yUnits;
      height = 340;
      width = isNaN(unitSize) ? 0 : unitSize * xUnits;
    }
  }


  return { width, height };
}
