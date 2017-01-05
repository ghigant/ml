import {concat} from 'lodash';

const supportFileApi = () => (
  !!(window.File && window.FileReader && window.FileList && window.Blob)
);

const parse = (content) => {
  const lines = content.split(/[\r\n]+/g).filter((line) => line.trim().length !== 0);
  return lines.map((line) => {
    return concat(...line.split(' ')).map(item => parseFloat(item, 10));
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
