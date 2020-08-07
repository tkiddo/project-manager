import React from 'react';
import './index.scss';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import useDirectory from '../../hooks/useDirectory';

const FormModal = (props) => {
  const { show, onHide, title, fields, onSubmit } = props;

  const [directory, changeDirectory] = useDirectory();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      const data = {};
      fields.forEach((item) => {
        const key = item.field;
        data[key] = form[key].value;
      });
      onSubmit({ ...data, directory });
    }
  };
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="form-modal"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fields.map((item) => (
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                {item.label}
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  required
                  type="text"
                  placeholder={`输入${item.label}`}
                  readOnly={item.readonly}
                  defaultValue={item.value}
                  plaintext={item.readonly}
                  name={item.field}
                  size="sm"
                />
                <Form.Control.Feedback type="invalid">{`请输入${item.label}`}</Form.Control.Feedback>
              </Col>
            </Form.Group>
          ))}
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              目录
            </Form.Label>
            <Col sm={9}>
              <InputGroup>
                <Form.Control required type="text" name="directory" size="sm" value={directory} />
                <InputGroup.Append>
                  <Button variant="outline-secondary" size="sm" onClick={changeDirectory}>
                    Pick
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            创建
          </Button>
          <Button onClick={onHide} variant="secondary">
            取消
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default React.memo(FormModal);
