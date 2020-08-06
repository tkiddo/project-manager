import React, { useEffect, useState } from 'react';
import './index.scss';

import { ipcRenderer } from 'electron';
import { Table } from 'react-bootstrap';

const TplManage = (props) => {
  const [list, setList] = useState([]);
  useEffect(async () => {
    ipcRenderer.send('request-template-list');
    ipcRenderer.once('get-template-list', (event, arg) => {
      setList(arg);
    });
  }, []);
  return (
    <>
      <div>TplManage</div>
      <Table size="sm">
        <thead className="tpl-table-head">
          <tr>
            <th>#</th>
            <th>名称</th>
            <th>框架</th>
            <th>标签</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody className="tpl-table-body">
          {list.map((item, index) => {
            const { name } = item;
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{name}</th>
                <th>框架</th>
                <th>标签</th>
                <th>操作</th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TplManage;
