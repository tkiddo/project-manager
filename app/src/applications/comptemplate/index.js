import React, { useState } from 'react';
import './index.scss';
import { Container, Tabs, Tab } from 'react-bootstrap';
import CustomScroll from '../../components/CustomScroll';
import CompItem from './compItem';
import ComponentItem from './compItem';

const CompTemplate = () => {
  const [key, setKey] = useState('react');
  const [list, setList] = useState([
    {
      name: 'react-buttons',
      description: 'button with react'
    }
  ]);
  return (
    <Container fluid className="padding-top-10">
      <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="react" title="React组件">
          <CustomScroll height="600px">
            {list.map((item) => {
              const { name, description } = item;
              return <ComponentItem name={name} description={description} />;
            })}
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
