/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import { Button, Container, Card, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { ipcRenderer, shell } from 'electron';
import CustomScroll from '../../components/CustomScroll';

const ProjectInfo = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [filter, setFilter] = useState('dependencies');
  useEffect(() => {
    ipcRenderer.send('request-project-info', id);
    ipcRenderer.once('get-project-info', (event, arg) => {
      setInfo(arg);
    });
  }, []);

  const handleOpenFolder = () => {
    shell.openExternal(info.destination);
  };

  const excuteCommand = (cmd) => {
    ipcRenderer.send('excute-command', { shell: cmd, destination: info.destination });
  };
  return (
    <Container fluid>
      <Container fluid className="top-menu-bar">
        <Button size="sm" onClick={handleOpenFolder}>
          打开文件夹
        </Button>
        <Button
          size="sm"
          className="margin-left-10"
          onClick={() => {
            excuteCommand('yarn');
          }}
        >
          安装依赖
        </Button>
      </Container>
      <CustomScroll height="630px">
        <Card className="project-info-item">
          <Card.Header>基础信息</Card.Header>
          <Card.Body className="project-info-basic">
            <Card.Text className="project-basic-item">
              名称：
              {info.name}
            </Card.Text>
            <Card.Text className="project-basic-item">
              版本：
              {info.version}
            </Card.Text>
            <Card.Text className="project-basic-item">
              作者：
              {info.author}
            </Card.Text>
            <Card.Text className="project-basic-item">
              描述：
              {info.description}
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="project-info-item">
          <Card.Header>Scripts</Card.Header>
          <ListGroup variant="flush">
            {info.scripts &&
              Object.keys(info.scripts).map((key) => {
                const ele = info.scripts[key];
                return (
                  <ListGroup.Item className="project-script-item">
                    <div>
                      {/* eslint-disable-next-line */}
                      <span className="script-key">{key}</span> :{' '}
                      <span className="script-value">{ele}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => excuteCommand(`yarn ${key}`)}
                    >
                      执行
                    </Button>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </Card>

        <Card className="project-info-item">
          <Card.Header className="project-info-header">
            <span>项目依赖</span>
            <DropdownButton size="sm" title={filter} variant="secondary">
              <Dropdown.Item
                onClick={() => {
                  setFilter('dependencies');
                }}
              >
                dependencies
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setFilter('devDependencies');
                }}
              >
                devDependencies
              </Dropdown.Item>
            </DropdownButton>
          </Card.Header>
          <ListGroup>
            {info[filter] &&
              Object.keys(info[filter]).map((key) => {
                const ele = info[filter][key];
                return (
                  <ListGroup.Item>
                    <span className="dep-key">{key}</span> :{' '}
                    <span className="dep-value">{ele}</span>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </Card>
      </CustomScroll>
    </Container>
  );
};

export default ProjectInfo;
