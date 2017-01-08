import React from 'react';
import {Link} from 'react-router';

const Header = (props) => {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">{props.title}</Link>
        </div>
        {props.children}
      </div>
    </nav>
  );
};

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.object
};

Header.defaultProps = {
  title: 'Machine Learning'
};

export default Header;
