import React, { useState, useEffect } from 'react';
import './index.scss';
import { Container, Tabs, Tab, Button, Spinner } from 'react-bootstrap';
import { ipcRenderer } from 'electron';
import CustomScroll from '../../components/CustomScroll';
import ComponentItem from './compItem';
import FormModal from '../../components/FormModal';
import useToast from '../../hooks/useToast';

const CompTemplate = () => {
  const [type, setType] = useState('react');
  const [listState, setListState] = useState({
    list: [],
    loading: false,
    selectedItem: null
  });
  const [modalShow, setModalShow] = useState(false);
  const [showToast] = useToast();

  const getList = (forced) => {
    ipcRenderer.send('request-component-list', { type, forced });
    setListState({ ...listState, loading: true });
    ipcRenderer.once('get-component-list', (event, arg) => {
      setListState({ ...listState, list: arg, loading: false });
    });
  };
  useEffect(() => {
    getList(false);
  }, []);

  const handleSelect = (item) => {
    setListState({ ...listState, selectedItem: item });
    setModalShow(true);
  };

  const handleSubmit = (form) => {
    const data = { ...form, ...listState.selectedItem };
    ipcRenderer.send('create-component', data);
    ipcRenderer.once('component-created', () => {
      showToast('组件创建成功！');
      setModalShow(false);
    });
  };
  return (
    <Container fluid className="padding-top-10">
      <Tabs activeKey={type} onSelect={(k) => setType(k)}>
        <Tab eventKey="react" title="React组件">
          <CustomScroll height="600px">
            <div className="comp-list">
              {listState.list.map((item) => {
                const { name, description, title, filepath } = item;
                return (
                  <ComponentItem
                    name={name}
                    description={description}
                    title={title}
                    filepath={filepath}
                    type="react"
                    onCreate={() => {
                      handleSelect({ ...item, type: 'react' });
                    }}
                  />
                );
              })}
            </div>
          </CustomScroll>
        </Tab>
        <Tab eventKey="vue" title="Vue组件">
          Vue组件
        </Tab>
        <Tab eventKey="wechat" title="微信小程序组件">
          微信小程序组件
        </Tab>
      </Tabs>
      <Container className="top-menu-bar" fluid>
        <Button size="sm" className="margin-left-10" onClick={() => getList(true)}>
          {listState.loading && (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          )}
          {listState.loading ? '加载中...' : '手动更新'}
        </Button>
      </Container>
      <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="创建组件"
        onSubmit={handleSubmit}
        fields={[
          {
            name: 'directory',
            label: '目标目录',
            value: '',
            readonly: false,
            type: 'directory',
            required: true
          }
        ]}
      />
    </Container>
  );
};

export default CompTemplate;
