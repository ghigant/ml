import Editor from './Editor';

import {connect} from 'react-redux';

const mapToStateToProps = (state) => {
  return state.editor;
}

export default connect(mapToStateToProps)(Editor);
