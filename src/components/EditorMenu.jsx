import React from 'react';
import {Link} from 'react-router';

const EditorMenu = () => ((
  <ul>
    <ul className="nav navbar-nav navbar-right">
      <li><Link to={'/editor'}>Save</Link></li>
    </ul>
  </ul>
));

export default EditorMenu;
