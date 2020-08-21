import React from '
import './index.scss';
import { ButtonGroup, Dropdown, DropdownButton, Accordion, Card, Button } from '';

const RuleItem = (props) => {
  const { name, description, onConfig } = props;
  const handleClick = (value) => () => {
    onConfig()({
      [name]: value
    });
  };
  return (
    <Accordion>
      <div className="rule-item">
        <Accordion.Toggle eventKey={name} as={Button} variant="link">
          <span className="rule-item-name">{name}</span>
        </Accordion.Toggle>
        <DropdownButton as={ButtonGroup} title="配置" size="sm" variant="info">
          <Dropdown.Item eventKey="0" onClick={handleClick(0)} className="config-value">
            off
          </Dropdown.Item>
          <Dropdown.Item eventKey="1" onClick={handleClick(1)} className="config-value">
            warn
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={handleClick(2)} className="config-value">
            error
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <Accordion.Collapse eventKey={name}>
        <Card.Body>{description}</Card.Body>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default RuleItem;
