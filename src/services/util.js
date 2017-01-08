import * as scale from 'd3-scale';

export function isFileApiEnabled() {
  return !!(window.File && window.FileReader && window.FileList && window.Blob);
}

export function scaleLinear(domain = [0, 10], range = [0, 10]) {
  return scale.scaleLinear().domain(domain).range(range);
}
