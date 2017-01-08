import _ from 'lodash';
// const size = require('lodash').size;
// const min = require('lodash').min;
// const max = require('lodash').max;
// const range = require('lodash').range;
// const isArray = require('lodash').isArray;
// const get = require('lodash').get;
// const set = require('lodash').set;
// const pullAt = require('lodash').pullAt;
// const concat = require('lodash').concat;

const dataset = [0, 4, 5, 20, 25, 39, 43, 44];

const singleLinkage = (distances = []) => {
  return _.size(distances) ? _.min(distances) : 0;
};

const completeLinkage = (distances) => {
  return _.size(distances) ? _.max(distances) : 0;
};

const averageLinkage = (distances) => {
  var totalDistances = _.size(distances);
  return totalDistances > 0 ? _.sum(distances) / totalDistances : 0;
};

const isSingleteton = (cluster) => !_.isObject(_.first(cluster));

const getClusterItems = (cluster) => {
  if (isSingleteton(cluster)) {
    return cluster;
  }

  return _.reduce(cluster, (items, part) => {
    return _.concat(items, getClusterItems(part));
  }, []);
}

const euclidianDistance = (p, q) => {
  return Math.sqrt(
    p.reduce((sum, pi, i) => {
      let qi = q[i];
      return sum + Math.pow(qi - pi, 2);
    }, 0)
  );
};



const distance = (from, to, sim = singleLinkage) => {
  let distances = _.reduce(from, (dists, fromItem) => {
    return _.concat(dists, _.map(to, (toItem) => (
      euclidianDistance(fromItem, toItem)))
    )
  }, []);

  return sim(distances);
};

const getDistanceMatrix = (data, sim) => {
  return _.range(0, _.size(data)).map((i) => {
    return _.range(0, i + 1).map((j) => {
      if (i === j) {
        return 0;
      }
      const from = data[i], to = data[j];
      return distance(from, to, sim);
    });
  });
};

const getMinDistance = (matrix) => {
  const matrixSize = _.size(matrix);
  let position = [1, 0];
  for (let i = 1; i < matrixSize; i += 1) {
    const rowSize = _.size(matrix[i]);
    for (let j = 0; j < rowSize - 1; j += 1) {
      if (_.get(matrix, [i, j]) < _.get(matrix, position)) {
        position = [i, j];
      }
    }
  }

  return position;
};

const clustering = (data = [], simFn) => {
  const c = data.map((d) => _.isArray(d) ? d : [d]);
  const C = c.map((d) => [d]);

  while(_.size(C) > 1) {
    let distances = getDistanceMatrix(C, simFn);
    const position = getMinDistance(distances).sort();
    const [from, to] = position;

    const cluster = _.at(C, [from, to]).reduce((result, part) => {
      return _.concat(result, part);
    }, []);

    _.pullAt(C, to);

    _.set(C, from, cluster);
  
    return C;
  }
}

export default clustering;

export {
  singleLinkage,
  completeLinkage,
  averageLinkage
};

// clustering(dataset, completeLinkage);
