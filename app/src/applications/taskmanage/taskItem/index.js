import React from 'react';
import './index.scss';
import { Container, Card } from 'react-bootstrap';

const priorityMap = {
  1: 'danger',
  2: 'warning',
  3: 'primary'
};

const TaskItem = (props) => {
  const { createTime, content, priority } = props;
  return (
    <Container className="card-item">
      <Card bg={priorityMap[priority]} text="light">
        <Card.Header className="card-title">{createTime}</Card.Header>
        <Card.Body>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskItem;
