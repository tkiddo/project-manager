import React from 'react';
import './index.scss';
import { Container, Card, Button } from 'react-bootstrap';
import { shell } from 'electron';
import PropTypes from 'prop-types';

const CollectionItem = (props) => {
  const { title, description, link, onDelete } = props;
  const handleOpen = () => {
    shell.openExternal(link);
  };
  return (
    <Container className="card-item">
      <Card>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Card.Text>{description}</Card.Text>
          <div className="task-item-btns">
            <Button size="sm" variant="primary" onClick={handleOpen}>
              点击前往
            </Button>
            <Button size="sm" variant="secondary" className="margin-left-10" onClick={onDelete}>
              废弃
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CollectionItem;

CollectionItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};
