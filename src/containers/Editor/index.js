import Editor from './Editor';

import {connect} from 'react-redux';
import {find} from 'lodash';

const mapToStateToProps = (state, props) => {
  const dataset = find(state.dashboard.datasets, dataset => (
    dataset.id === props.routeParams.id
  ));

  return Object.assign(state.editor, {
    dataset: dataset ? dataset.data : [],
    isDendrogramVisible: !!state.editor.clustering
  });
}

export default connect(mapToStateToProps)(Editor);
