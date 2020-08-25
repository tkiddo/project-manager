import React, { useEffect, useState, useMemo } from 'react';
import './index.scss';

import { ipcRenderer } from 'electron';
import { Table, Button, Spinner, Badge, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import FormModal from '../../components/FormModal';
import useToast from '../../hooks/useToast';

import { getBadge } from '../../util';

const TplManage = () => {
  const [listState, setListState] = useState({
    list: [],
    loading: false,
    selectedItem: null
  });
  const [modalShow, setModalShow] = useState(false);

  const [showToast] = useToast();
  const history = useHistory();

  const getList = (forced) => {
    setListState({ ...listState, loading: true });
    ipcRenderer.send('request-template-list', forced);
    ipcRenderer.once('get-template-list', (event, arg) => {
      setListState({ ...listState, loading: false, list: arg });
    });
  };
  const handleSelect = (item) => {
    setListState({ ...listState, selectedItem: item });
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
      <Container className="top-menu-bar" fluid>
        <Button size="sm" className="margin-left-10" onClick={() => getList(true)}>
          {listState.loading && (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          )}
          {listState.loading ? '加载中...' : '手动更新'}
        </Button>
      </Container>

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
          {useMemo(
            () =>
              // eslint-disable-next-line implicit-arrow-linebreak
              listState.list.map((item, index) => {
                const { name, frame, meta } = item;
                return (
                  // eslint-disable-next-line react/no-array-index-key
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
              }),
            [listState.list]
          )}
        </tbody>
      </Table>
      <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        fields={[
          {
            name: 'template',
            label: '模板名称',
            value: listState.selectedItem,
            readonly: true,
            type: 'text',
            required: true
          },
          {
            name: 'name',
            label: '项目名称',
            value: '',
            readonly: false,
            type: 'text',
            required: true
          },
          {
            name: 'description',
            label: '项目描述',
            value: '',
            readonly: false,
            type: 'text',
            required: true
          },
          {
            name: 'directory',
            label: '项目目录',
            value: '',
            readonly: false,
            type: 'directory',
            required: true
          }
        ]}
        title="创建项目"
        confirmText="创建"
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default TplManage;
