import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RuleItem from './ruleItem';
import './index.scss';

const EslintManage = () => {
  const rules = ipcRenderer.sendSync('get-eslint-rules');
  const [json, setJson] = useState({ rules: {} });
  const handleConfig = () => (config) => {
    setJson({ rules: { ...json.rules, ...config } });
  };
  return (
    <>
      <Button size="sm" className="reset" onClick={() => setJson({ rules: {} })}>
        重置
      </Button>
      <Container fluid className="eslint-manage">
        <Row>
          <Col md={5} lg={3} className="rule-list">
            {rules.map((item) => {
              const { name } = item;
              return <RuleItem name={name} key={name} onConfig={handleConfig} />;
            })}
          </Col>
          <Col md={7} lg={9}>
            <pre>
              <code>{`${JSON.stringify(json, null, 2)}`}</code>
            </pre>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EslintManage;
