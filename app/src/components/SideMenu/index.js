import React from 'react';
import './index.scss';
import MenuItem from './MenuItem';
import { menu } from '../../config';

const SideMenu = () => (
  <>
    {menu.map((item) => {
      const { name, path } = item;
      return <MenuItem name={name} path={path} key={path} />;
    })}
  </>
);

export default React.memo(SideMenu);
