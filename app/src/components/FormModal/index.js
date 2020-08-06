import React from 'react';
import './index.scss';
import { Modal, Button, Form } from 'react-bootstrap';

const FormModal = (props) => {
  const { show, onHide, title, fields, onSubmit } = props;
  return (
    <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          {fields.map((item) => (
            <Form.Group controlId="formGroupEmail">
              <Form.Label>{item.label}</Form.Label>
              <Form.Control
                type="text"
                placeholder={`输入${item.label}`}
                readOnly={item.readonly}
                defaultValue={item.value}
                plaintext={item.readonly}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit">
          创建
        </Button>
        <Button onClick={onHide} variant="secondary">
          取消
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(FormModal);
