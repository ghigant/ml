import React from 'react';
import {Link} from 'react-router';

import FileButton from 'components/FileButton/FileButton';
import {isFileApiEnabled} from 'services/util';

const Navigation = ({onImport}) => ((
  <ul className="nav navbar-nav navbar-right">
    <li>
      <Link to={'/editor'}>New</Link>
    </li>
    { isFileApiEnabled && (
      <li>
        <FileButton
          className="btn btn-primary navbar-btn"
          label={'Import'}
          onFileSelected={onImport} />
      </li>
    )}

  </ul>
));

Navigation.propTypes = {
  onImport: React.PropTypes.func
};

export default Navigation;
