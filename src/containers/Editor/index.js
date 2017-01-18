import Editor from './Editor';

import {connect} from 'react-redux';
import {find} from 'lodash';

import {
  getDomainsFromData,
  scaleLinear,
  getBoardSize
} from 'services/util';

const mapToStateToProps = (state, props) => {

  const dataset = find(state.dashboard.datasets, dataset => (
    dataset.id === props.routeParams.id
  ));
  let xDomain = [0, 10], yDomain = [0, 10];
  if (props.routeParams.id) {
    let domains = getDomainsFromData(dataset ? dataset.data: []);
    xDomain = domains.xDomain;
    yDomain = domains.yDomain;
  }
  let {width, height} = getBoardSize(xDomain, yDomain);
  width += 60;
  height += 60;

  return {
    dataset: dataset ? dataset.data : state.editor.dataset,
    isDendrogramVisible: !!state.editor.clustering,
    xScale: scaleLinear(xDomain, [30, width - 30]),
    yScale: scaleLinear(yDomain.reverse(), [30, height - 30]),
    width,
    height,
    clustering: state.editor.clustering
  };
}

export default connect(mapToStateToProps)(Editor);
