import React, { useEffect, useState } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { ipcRenderer, shell } from 'electron';

const ProjectInfo = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  useEffect(() => {
    ipcRenderer.send('request-project-info', id);
    ipcRenderer.once('get-project-info', (event, arg) => {
      setInfo(arg);
    });
  });

  const handleOpenFolder = () => {
    shell.openExternal(info.destination);
  };
  return (
    <Container fluid>
      <Container fluid className="top-menu-bar">
        <Button size="sm" onClick={handleOpenFolder}>
          打开文件夹
        </Button>
      </Container>
      <div>{id}</div>
    </Container>
  );
};

export default ProjectInfo;
