import React, { useEffect, useState } from 'react';
import './index.scss';
import { ipcRenderer } from 'electron';
import { menu } from '../../config';
import usePathname from '../../hooks/pathname';

const getTitle = (pathname) => {
  if (pathname === '/') {
    return '首页';
  }
  const res = menu.find((item) => item.path.indexOf(pathname) !== -1);
  return res.name ? res.name : 'not found';
};

const Header = (props) => {
  const pathname = usePathname();

  const [local, setLocal] = useState('');

  useEffect(() => {
    const dir = ipcRenderer.sendSync('get-local-dir');
    setLocal(dir);
  }, []);

  const handleChange = () => {
    ipcRenderer.send('change-dir', 'openDirectory');
    ipcRenderer.once('selected-dir', (event, arg) => {
      setLocal(arg);
    });
  };

  return (
    <div className="header">
      <span>{getTitle(pathname)}</span>
      <div className="header-local">
        <span>
          <span style={{ padding: '0 5px' }}>当前工作目录:</span>
          <span className="local-dir" onClick={handleChange}>
            {local.replace(/\\/gs, '/')}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Header;
