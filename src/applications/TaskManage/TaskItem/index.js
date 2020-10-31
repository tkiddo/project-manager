import React from 'react';
import './index.scss';
import { Container, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const priorityMap = {
  3: { text: 'white', bg: 'primary' },
  2: { text: 'white', bg: 'dark' },
  1: { text: 'dark', bg: 'white' }
};

const TaskItem = (props) => {
  const { createTime, content, priority, done, onFinish, onDelete } = props;
  return (
    <Container className="card-item">
      <Card bg={priorityMap[priority].bg} text={priorityMap[priority].text}>
        <Card.Header>{done ? '已完成' : '未完成'}</Card.Header>
        <Card.Body>
          <Card.Text>{content}</Card.Text>
          <div className="task-item-btns">
            {!done && (
              <Button size="sm" variant="success" className="task-item-btn" onClick={onFinish}>
                完成
              </Button>
            )}
            <Button size="sm" variant="secondary" onClick={onDelete}>
              废弃
            </Button>
          </div>
        </Card.Body>
        <Card.Footer>{createTime}</Card.Footer>
      </Card>
    </Container>
  );
};

export default TaskItem;

TaskItem.propTypes = {
  createTime: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  done: PropTypes.bool,
  onFinish: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

TaskItem.defaultProps = {
  done: false
};
