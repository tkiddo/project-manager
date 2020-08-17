import React from 'react';
import './index.scss';
import { Container, Col, Button, Form, InputGroup } from 'react-bootstrap';

const TaskManage = () => {
  const a = 1;
  return (
    <Container fluid className="task-manage padding-top-10">
      <Form className="eslint-form">
        <Form.Row>
          <Col md={8}>
            <Form.Group>
              <InputGroup>
                <Form.Control type="text" name="content" size="sm" placeholder="请输入任务内容" />
                {/* 防止回车键提交表单 */}
                <input style={{ display: 'none' }} />
                <InputGroup.Append>
                  <Button variant="primary" size="sm">
                    添加
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button size="sm" className="reset" variant="secondary">
              清空
            </Button>
            <Button size="sm" className="reset" variant="success">
              全部完成
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default TaskManage;
