/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Card,
  ListGroup,
  DropdownButton,
  Dropdown,
  ButtonGroup
} from 'react-bootstrap';
import { ipcRenderer, shell } from 'electron';
import CustomScroll from '../../components/CustomScroll';
import FormModal from '../../components/FormModal';

const ProjectInfo = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [filter, setFilter] = useState('dependencies');
  const [formState, setFormState] = useState({
    title: '',
    fields: [],
    show: false
  });

  const getInfo = () => {
    ipcRenderer.send('request-project-info', id);
    ipcRenderer.once('get-project-info', (event, arg) => {
      setInfo(arg);
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleOpenFolder = () => {
    shell.openExternal(info.destination);
  };

  const excuteCommand = (cmd) => {
    ipcRenderer.send('excute-command', {
      shell: cmd,
      destination: info.destination,
      detached: true
    });
  };

  const showDepForm = () => {
    setFormState({
      title: '添加依赖',
      show: true,
      fields: [
        {
          name: 'name',
          label: '名称',
          required: true
        },
        {
          name: 'type',
          label: '类别',
          as: 'select',
          options: ['dependencies', 'devDependencies']
        }
      ]
    });
  };

  const showScriptForm = () => {
    setFormState({
      title: '添加脚本',
      show: true,
      fields: [
        {
          name: 'name',
          label: '名称',
          required: true
        },
        {
          name: 'script',
          label: '脚本',
          required: true
        }
      ]
    });
  };

  const handleSubmit = (form) => {
    if (form.type) {
      ipcRenderer.send('add-dependency', { dep: form, destination: info.destination });
    } else {
      ipcRenderer.send('add-script', { form, destination: info.destination });
    }
    ipcRenderer.once('get-project-info', (event, arg) => {
      setInfo(arg);
      setFormState({ ...formState, show: false });
    });
  };

  return (
    <Container fluid>
      <Container fluid className="top-menu-bar">
        <Button size="sm" onClick={handleOpenFolder}>
          打开文件夹
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
          <Card.Header className="project-info-header">
            <span>Scripts</span>
            <Button size="sm" variant="primary" className="margin-left-10" onClick={showScriptForm}>
              添加脚本
            </Button>
          </Card.Header>
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
            <ButtonGroup>
              <Button size="sm" variant="primary" className="margin-left-10" onClick={showDepForm}>
                添加依赖
              </Button>
              <Button
                size="sm"
                variant="info"
                className="margin-left-10"
                onClick={() => {
                  excuteCommand('yarn');
                }}
              >
                yarn install
              </Button>

              <DropdownButton size="sm" title={filter} variant="secondary" as={ButtonGroup}>
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
            </ButtonGroup>
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
      <FormModal
        title={formState.title}
        show={formState.show}
        fields={formState.fields}
        onHide={() => setFormState({ ...formState, show: false })}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default ProjectInfo;
