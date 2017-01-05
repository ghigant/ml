import {concat} from 'lodash';

export const parse = (content) => {
  const lines = content.split(/[\r\n]+/g);
  return lines.map((line) => {
    return concat(...line.split(' ')).map(item => parseFloat(item, 10));
  });
}
