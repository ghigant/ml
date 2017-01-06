import React from 'react';

const Header = (props) => {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="navbar-header">
        <a className="navbar-brand">{props.title}</a>
      </div>
    </nav>
  );
};

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};

Header.defaultProps = {
  title: 'Machine Learning'
};

export default Header;
