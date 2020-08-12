import React, { useState, useEffect } from 'react';
import { Button, Table, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';
import './index.scss';

const ProjectManage = () => {
  const [list, setList] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const result = ipcRenderer.sendSync('get-project-list');
    setList(result);
  }, []);
  const handleOpen = (options) => {
    ipcRenderer.send('open-project', options);
  };
  return (
    <>
      <Button size="sm" className="create-btn" onClick={() => history.push('/tplmanage')}>
        创建项目
      </Button>
      <Table size="sm" hover>
        <thead className="table-head">
          <tr>
            <th>名称</th>
            <th>模版</th>
            <th>描述</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {list.map((item, index) => {
            const { name, template, description, destination } = item;
            return (
              <tr key={index}>
                <th className="table-item project-item-name">{name}</th>
                <th className="table-item project-item-template">{template}</th>
                <th className="table-item project-item-description">{description}</th>
                <th>
                  <DropdownButton as={ButtonGroup} title="编辑器打开" size="sm">
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => handleOpen({ ide: 'vscode', destination, name })}
                    >
                      VS Code
                    </Dropdown.Item>
                  </DropdownButton>
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ProjectManage;
