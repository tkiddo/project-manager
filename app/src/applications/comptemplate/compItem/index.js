import React from 'react';
import './index.scss';
import { Card, Button } from 'react-bootstrap';
import { api } from '../../../config';

const ComponentItem = (props) => {
  const { name, description, title, filepath } = props;
  const previewUrl = api.ReactComponentPreviewUrl;

  const handlePreview = () => {
    window.open(`${previewUrl}${name}`);
  };
  return (
    <Card className="comp-item">
      <Card.Header>{title}</Card.Header>
      <Card.Body>{description}</Card.Body>
      <div className="comp-btn-group">
        <Button size="sm" variant="success">
          应用
        </Button>
        <Button size="sm" variant="danger" className="margin-left-10" onClick={handlePreview}>
          预览
        </Button>
      </div>
    </Card>
  );
};

export default ComponentItem;
