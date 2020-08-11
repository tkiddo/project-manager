import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { ipcRenderer } from 'electron';

const ProjectManage = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const result = ipcRenderer.sendSync('get-project-list');
    console.log(result);
    setList(result);
  }, []);
  return (
    <>
      <Button size="sm" className="tpl-fresh">
        创建项目
      </Button>
      <Table size="sm" hover>
        <thead className="tpl-table-head">
          <tr>
            <th>名称</th>
            <th>模版</th>
            <th>描述</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody className="tpl-table-body">
          {list.map((item, index) => {
            const { name, template, description } = item;
            return (
              <tr key={index}>
                <th className="tpl-item-name">{name}</th>
                <th>{template}</th>
                <th className="tpl-item-meta">{description}</th>
                <th>
                  <Button variant="success" size="sm">
                    编辑器打开
                  </Button>
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
