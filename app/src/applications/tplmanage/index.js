import React, { useEffect, useState } from 'react';
import './index.scss';

import { ipcRenderer } from 'electron';
import { Table, Button, Spinner, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import FormModal from '../../components/FormModal';
import useToast from '../../hooks/useToast';

import { getBadge } from '../../util';

const TplManage = () => {
  const [list, setList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tpl, setTpl] = useState(null);
  const [showToast] = useToast();
  const history = useHistory();

  const getList = (forced) => {
    setLoading(true);
    ipcRenderer.send('request-template-list', forced);
    ipcRenderer.once('get-template-list', (event, arg) => {
      setLoading(false);
      setList(arg);
    });
  };
  const handleSelect = (item) => {
    setTpl(item);
    setModalShow(true);
  };
  useEffect(() => {
    getList(false);
  }, []);

  const handleSubmit = (form) => {
    ipcRenderer.send('create-template-project', form);
    ipcRenderer.once('project-created', () => {
      showToast('项目创建成功！');
      history.push('/projectmanage');
      setModalShow(false);
    });
  };
  return (
    <>
      <Button size="sm" className="tpl-fresh" onClick={() => getList(true)}>
        {loading && (
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        )}
        {loading ? '加载中...' : '更新列表'}
      </Button>
      <Table size="sm" hover>
        <thead className="table-head">
          <tr>
            <th>名称</th>
            <th>框架</th>
            <th>标签</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {list.map((item, index) => {
            const { name, frame, meta } = item;
            return (
              <tr key={index}>
                <th className="tpl-item-name table-item">{name}</th>
                <th>
                  <Badge variant={getBadge(frame)}>{frame}</Badge>
                </th>
                <th className="tpl-item-meta table-item">{meta}</th>
                <th>
                  <Button variant="success" size="sm" onClick={() => handleSelect(name)}>
                    创建项目
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
          { field: 'template', label: '模板名称', value: tpl, readonly: true },
          { field: 'name', label: '项目名称', value: '', readonly: false },
          { field: 'description', label: '项目描述', value: '', readonly: false }
        ]}
        title="创建项目"
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default TplManage;
