import _ from 'lodash';

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

export const cluterHeight = (items) => {
  const size = _.size(items);
  const sum = _.range(0, size - 1).reduce((sum, i) => {
    return sum + _.range(i + 1, size).reduce((subsum, j) => {
      return subsum + euclidianDistance(items[i], items[j]);
    }, 0);
  }, 0);

  return sum / (size * (size - 1) / 2);
};

const isSingleteton = (cluster) => {
  // const values = _.first(cluster);
  // return _.isArray(values) && _.isNumber(_.first(values));
  return _.isArray(cluster) && _.isNumber(_.first(cluster));
};

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
  const steps = [];
  const cc = c.map((d, index) => ({
    v: [d],
    c: index,
    h: 0
  }));

  const C = c.map((d) => [d]);

  while(_.size(C) > 1) {
    let distances = getDistanceMatrix(C, simFn);

    const position = getMinDistance(distances).sort();

    const from = _.min(position);
    const to = _.max(position);

    const values = _.at(C, [from, to]).reduce((result, part) => {
      return _.concat(result, part);
    }, []);

    const left = _.get(cc, from);
    const right = _.get(cc, to);

    const cHeight = cluterHeight(values);
    
    const cluster = {
      v: values,
      h: cHeight,
      c: (left.c + right.c) / 2,
      d: right.c - left.c,
      path: [
        [left.c, left.h],
        [left.c, cHeight],
        [right.c, cHeight],
        [right.c, right.h]
      ]
    }

    _.pullAt(C, to);
    _.pullAt(cc, to);

    _.set(C, from, values);
    _.set(cc, from, cluster);

    steps.push(cluster);
  }
  // console.log(steps);
  return steps;
}

export default clustering;

export {
  singleLinkage,
  completeLinkage,
  averageLinkage
};
