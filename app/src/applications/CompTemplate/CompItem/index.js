import React from 'react';
import './index.scss';
import { Card, Button } from 'react-bootstrap';
import { componentTemplateApi } from '../../../config';

const CompItem = (props) => {
  const { name, description, title, type, onCreate } = props;
  const { previewUrl } = componentTemplateApi[type];

  const handlePreview = () => {
    window.open(`${previewUrl}${name}`);
  };

  return (
    <Card className="comp-item">
      <Card.Header>{title}</Card.Header>
      <Card.Body>{description}</Card.Body>
      <div className="comp-btn-group">
        <Button size="sm" variant="success" onClick={onCreate}>
          应用
        </Button>
        <Button size="sm" variant="info" className="margin-left-10" onClick={handlePreview}>
          预览
        </Button>
      </div>
    </Card>
  );
};

export default CompItem;
