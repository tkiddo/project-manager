import React, { useState, useEffect } from 'react';
import './index.scss';
import { Container, Button, Card } from 'react-bootstrap';
import FormModal from '../../components/FormModal';

const TaskManage = () => {
  const [list, setList] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setModalShow(false);
  }, [list]);

  const handleSubmit = (form) => {
    setList([...list, form]);
  };
  return (
    <Container fluid className="task-manage padding-top-10">
      <div className="task-btn-group">
        <Button variant="primary" size="sm" className="reset" onClick={() => setModalShow(true)}>
          添加
        </Button>
        <Button size="sm" className="reset" variant="secondary" onClick={() => setList([])}>
          清空
        </Button>
      </div>

      <div className="scroll-wrapper">
        <div className="list-container">
          {list.map((item) => (
            <Container className="card-item">
              <Card bg="info" text="light">
                <Card.Header className="card-title">{item.createTime}</Card.Header>
                <Card.Body>
                  <Card.Text>{item.content}</Card.Text>
                </Card.Body>
              </Card>
            </Container>
          ))}
        </div>
      </div>

      <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="创建笔记"
        onSubmit={handleSubmit}
        fields={[
          {
            name: 'createTime',
            label: '创建时间',
            required: true,
            readonly: true,
            value: new Date().toLocaleString()
          },
          { name: 'content', label: '笔记内容', as: 'textarea', required: true }
        ]}
      />
    </Container>
  );
};

export default TaskManage;
