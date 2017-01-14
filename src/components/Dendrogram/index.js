import Dendrogram from './Dendrogram';
import {connect} from 'react-redux';

const mapToState = (state) => ({
  dataset: state.editor.dataset,
  clustering: state.editor.clustering
});

export default connect(mapToState)(Dendrogram);
