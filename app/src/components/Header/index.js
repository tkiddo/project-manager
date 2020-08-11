import React from 'react';
import './index.scss';
import { menu } from '../../config';
import usePathname from '../../hooks/pathname';
import useDirectory from '../../hooks/useDirectory';

const getTitle = (pathname) => {
  if (pathname === '/') {
    return '欢迎使用';
  }
  const res = menu.find((item) => item.path.indexOf(pathname) !== -1);
  return res ? res.name : 'Sliver GUI';
};

const Header = () => {
  const pathname = usePathname();

  const [directory, changeDirectory] = useDirectory();

  return (
    <div className="header">
      <span>{getTitle(pathname)}</span>
      <div className="header-local">
        <span>
          <span style={{ padding: '0 5px' }}>当前工作目录:</span>
          {/* eslint-disable-next-line */}
          <span className="local-dir" onClick={changeDirectory}>
            {directory}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Header;
