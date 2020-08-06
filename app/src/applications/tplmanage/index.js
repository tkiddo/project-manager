import React, { useEffect, useState } from 'react';
import './index.scss';

import { ipcRenderer } from 'electron';
import { Table, Button, Spinner, Badge } from 'react-bootstrap';

const TplManage = () => {
  const [list, setList] = useState([{ name: '1' }]);
  const [loading, setLoading] = useState(true);
  const getList = (forced) => {
    setLoading(true);
    ipcRenderer.send('request-template-list', forced);
    ipcRenderer.once('get-template-list', (event, arg) => {
      setLoading(false);
      setList(arg);
    });
  };
  useEffect(() => {
    getList(false);
  }, []);
  return (
    <>
      <Button size="sm" className="tpl-fresh" onClick={() => getList(true)}>
        {loading && (
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        )}
        {loading ? '加载中...' : '刷新'}
      </Button>
      <Table size="sm" hover>
        <thead className="tpl-table-head">
          <tr>
            <th>名称</th>
            <th>框架</th>
            <th>标签</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody className="tpl-table-body">
          {list.map((item, index) => {
            const { name, frame, meta } = item;
            return (
              <tr key={index}>
                <th className="tpl-item-name">{name}</th>
                <th>
                  <Badge variant="warning">{frame}</Badge>
                </th>
                <th className="tpl-item-meta">{meta}</th>
                <th>
                  <Button variant="success" size="sm">
                    创建模版项目
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
export default TplManage;
