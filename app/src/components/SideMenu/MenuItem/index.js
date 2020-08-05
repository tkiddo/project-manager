import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const MenuItem = (props) => {
  const { name, path } = props;
  return (
    <Link className="menu-item" to={path}>
      <span>{name}</span>
    </Link>
  );
};

export default MenuItem;
