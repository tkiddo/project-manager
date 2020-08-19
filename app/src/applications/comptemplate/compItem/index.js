import React from 'react';
import './index.scss';
import { Card, Button } from 'react-bootstrap';

const ComponentItem = (props) => {
  const { name, description } = props;
  return (
    <Card className="comp-item">
      <Card.Header>{name}</Card.Header>
      <Card.Body>{description}</Card.Body>
      <div>
        <Button size="sm" variant="success">
          应用
        </Button>
        <Button size="sm" variant="danger">
          预览
        </Button>
      </div>
    </Card>
  );
};

export default ComponentItem;
