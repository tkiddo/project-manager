import React, { useEffect, useState } from 'react';
import './index.scss';
import { withRouter } from 'react-router-dom';
import { menu } from '../../config';

const { ipcRenderer } = window.require('electron');

const getTitle = (pathname) => {
  if (pathname === '/') {
    return '首页';
  }
  const res = menu.find((item) => item.path.indexOf(pathname) !== -1);
  return res.name;
};

const Header = (props) => {
  const {
    location: { pathname }
  } = props;

  const [local, setLocal] = useState('');

  useEffect(() => {
    const dir = ipcRenderer.sendSync('get-local-dir');
    setLocal(dir);
  }, []);

  const handleChange = () => {
    ipcRenderer.send('change-dir', 'openDirectory');
    ipcRenderer.once('selected-dir', (event, arg) => {
      console.log(arg);
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

export default withRouter(Header);
