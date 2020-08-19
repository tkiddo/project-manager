import React, { useState, useEffect } from 'react';
import './index.scss';
import { Container, Tabs, Tab } from 'react-bootstrap';
import { ipcRenderer } from 'electron';
import CustomScroll from '../../components/CustomScroll';
import ComponentItem from './compItem';

const CompTemplate = () => {
  const [key, setKey] = useState('react');
  const [list, setList] = useState([]);
  useEffect(() => {
    ipcRenderer.send('request-react-component-list');
    ipcRenderer.once('get-react-component-list', (event, arg) => {
      setList(arg);
    });
  }, []);
  return (
    <Container fluid className="padding-top-10">
      <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
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
    </Container>
  );
};

export default CompTemplate;
