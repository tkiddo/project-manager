import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { Container, Row, Col, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import RuleItem from './ruleItem';
import './index.scss';

const rules = ipcRenderer.sendSync('get-eslint-rules');

const EslintManage = () => {
  const [json, setJson] = useState({ rules: {} });
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState(rules);

  const handleConfig = () => (config) => {
    setJson({ rules: { ...json.rules, ...config } });
  };

  const handleInput = (e) => {
    setKeyword(e.currentTarget.value);
  };

  const handleSearch = () => {
    let result;
    if (keyword !== '') {
      result = list.filter((item) => item.name.indexOf(keyword) !== -1);
    } else {
      result = rules;
    }
    setList(result);
  };
  return (
    <>
      <Form className="eslint-form">
        <Form.Row>
          <Col md={8}>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="name"
                  size="sm"
                  placeholder="请输入Eslint规则"
                  onChange={handleInput}
                  value={keyword}
                />
                <InputGroup.Append>
                  <Button variant="primary" size="sm" onClick={handleSearch}>
                    搜索
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button
              size="sm"
              className="reset"
              onClick={() => setJson({ rules: {} })}
              variant="secondary"
            >
              重置
            </Button>
            <Button
              size="sm"
              className="reset"
              onClick={() => setJson({ rules: {} })}
              variant="success"
            >
              复制.eslintrc
            </Button>
          </Col>
        </Form.Row>
      </Form>

      <Container fluid className="eslint-manage">
        <Row>
          <Col md={5} lg={3} className="rule-list">
            {list.map((item) => {
              const { name, description } = item;
              return (
                <RuleItem
                  name={name}
                  key={name}
                  onConfig={handleConfig}
                  description={description}
                />
              );
            })}
          </Col>
          <Col md={7} lg={9}>
            <h5>
              <Badge>.eslintrc</Badge>
            </h5>
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
