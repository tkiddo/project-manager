import React, { useState, useEffect } from 'react';
import { Button, Table, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';
import FormModal from '../../components/FormModal';
import useToast from '../../hooks/useToast';
import './index.scss';

const ProjectManage = () => {
  const [list, setList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();
  const [showToast] = useToast();

  useEffect(() => {
    const result = ipcRenderer.sendSync('get-project-list');
    setList(result);
  }, []);
  const handleOpen = (options) => {
    ipcRenderer.send('open-project', options);
  };
  const handleSubmit = (form) => {
    ipcRenderer.send('import-project', form);
    ipcRenderer.once('project-imported', (event, arg) => {
      showToast('项目导入成功！');
      setList(arg);
      setModalShow(false);
    });
  };
  const handleDelete = (idx) => {
    const result = ipcRenderer.sendSync('delete-project', idx);
    showToast('项目删除成功！');
    setList(result);
  };
  return (
    <>
      <Button size="sm" className="create-btn" onClick={() => history.push('/tplmanage')}>
        创建项目
      </Button>
      <Button size="sm" className="create-btn" onClick={() => setModalShow(true)}>
        导入项目
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
                  <Button
                    variant="danger"
                    size="sm"
                    className="project-del"
                    onClick={() => handleDelete(index)}
                  >
                    删除
                  </Button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        fields={[
          {
            name: 'directory',
            type: 'directory',
            readonly: false,
            value: '',
            label: '项目目录'
          }
        ]}
        title="导入项目"
        confirmText="导入"
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ProjectManage;
