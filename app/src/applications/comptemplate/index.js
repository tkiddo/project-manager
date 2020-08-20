import React, { useState, useEffect } from 'react';
import './index.scss';
import { Container, Tabs, Tab } from 'react-bootstrap';
import { ipcRenderer } from 'electron';
import CustomScroll from '../../components/CustomScroll';
import ComponentItem from './compItem';
import FormModal from '../../components/FormModal';
import useToast from '../../hooks/useToast';

const CompTemplate = () => {
  const [type, setType] = useState('react');
  const [list, setList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectItem] = useState(null);
  const [showToast] = useToast();
  useEffect(() => {
    ipcRenderer.send('request-component-list', { type });
    ipcRenderer.once('get-component-list', (event, arg) => {
      setList(arg);
    });
  }, []);

  const handleSelect = (item) => {
    setSelectItem(item);
    setModalShow(true);
  };

  const handleSubmit = (form) => {
    const data = { ...form, ...selectedItem };
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
              {list.map((item) => {
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
