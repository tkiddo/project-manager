import React from 'react';
import './index.scss';
import { Button } from 'react-bootstrap';

const { ipcRenderer } = window.require('electron');

const MainContainer = () => {
  const handleClick = () => {
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

    // ipcRenderer.on('asynchronous-reply', (event, arg) => {
    //   console.log(arg); // prints "pong"
    // });
    // ipcRenderer.send('asynchronous-message', 'ping');
  };
  return (
    <>
      <Button onClick={handleClick}>click</Button>
    </>
  );
};

export default React.memo(MainContainer);
