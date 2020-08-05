import React from 'react';
import './index.scss';
import MenuItem from './MenuItem';

const menu = [
  {
    name: '模版管理',
    path: '/tplmanage'
  },
  {
    name: '组件管理',
    path: '/compmanage'
  }
];

const SideMenu = () => {
  return (
    <>
      {menu.map((item) => {
        const { name, path } = item;
        return <MenuItem name={name} path={path}></MenuItem>;
      })}
    </>
  );
};

export default React.memo(SideMenu);
