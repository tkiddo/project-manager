import React from 'react';
import { ipcRenderer } from 'electron';
import { Table, Button } from 'react-bootstrap';
import './index.scss';

const EslintManage = () => {
  const rules = ipcRenderer.sendSync('get-eslint-rules');
  return (
    <>
      <Table size="sm" hover>
        <thead className="table-head">
          <tr>
            <th>规则</th>
            <th>描述</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {rules.map((item, index) => {
            const { name, description } = item;
            return (
              <tr key={index}>
                <th className="table-item project-item-name">{name}</th>
                <th className="table-item project-item-description">{description}</th>
                <th>
                  <Button size="sm">配置</Button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default EslintManage;
