import React from 'react';
import './index.scss';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import useDirectory from '../../hooks/useDirectory';

const FormModal = (props) => {
  const { show, onHide, title, fields, onSubmit, confirmText } = props;

  const [directory, changeDirectory] = useDirectory();

  const renderFormItem = (item) => {
    if (item.type === 'directory') {
      return (
        <>
          <InputGroup>
            <Form.Control required as="input" name="directory" size="sm" value={directory} />
            <InputGroup.Append>
              <Button variant="outline-secondary" size="sm" onClick={changeDirectory}>
                Pick
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </>
      );
    }
    if (item.as === 'select') {
      return (
        <>
          <Form.Control as="select" name={item.name}>
            {item.as === 'select' && item.options.map((op) => <option>{op}</option>)}
          </Form.Control>
        </>
      );
    }
    return (
      <>
        <Form.Control
          required={item.required || false}
          type={item.type || 'text'}
          as={item.as || 'input'}
          placeholder={`输入${item.label}`}
          readOnly={item.readonly}
          defaultValue={item.value}
          plaintext={item.readonly}
          name={item.name}
          size="sm"
        />
      </>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      const data = {};
      fields.forEach((item) => {
        const key = item.name;
        data[key] = form[key].value;
      });
      onSubmit(data);
    }
  };
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="form-modal"
      dialogClassName="modal-60w"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fields &&
            fields.map((item) => (
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  {item.label}
                </Form.Label>
                <Col sm={9}>{renderFormItem(item)}</Col>
              </Form.Group>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            {confirmText || '确定'}
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
