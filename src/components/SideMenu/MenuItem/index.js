import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import usePathname from '../../../hooks/pathname';

const MenuItem = (props) => {
  const { name, path } = props;
  const pathname = usePathname();
  return (
    <Link className={`menu-item ${pathname === path ? 'active-menu' : ''}`} to={path}>
      <span>{name}</span>
    </Link>
  );
};

export default MenuItem;

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};
