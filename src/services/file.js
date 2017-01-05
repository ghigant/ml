import {concat} from 'lodash';

const parse = (content) => {
  const lines = content.split(/[\r\n]+/g);
  return lines.map((line) => {
    return concat(...line.split(' ')).map(item => parseFloat(item, 10));
  });
};

export {parse};
