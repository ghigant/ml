import {concat, size} from 'lodash';

const supportFileApi = () => (
  !!(window.File && window.FileReader && window.FileList && window.Blob)
);

const parse = (content) => {
  // split data by new line and clean epmty
  const lines = content.split(/[\r\n]+/g).filter((line) => line.trim().length !== 0);
  return lines.map((line) => {
    let point = concat(...line.split(' ')).map(item => parseFloat(item, 10));
    if (1 === size(point)) {
      return concat(point, 0);
    }
    return point;
  });
};

const read = function (file, done = () => {}) {
  const reader = new FileReader();
  reader.onload = (event) => {
    done(parse(event.target.result));
  };
  reader.readAsBinaryString(file);
};

export {supportFileApi, parse, read};
