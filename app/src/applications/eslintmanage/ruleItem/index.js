import React from 'react';
import './index.scss';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

const RuleItem = (props) => {
  const { name, description, onConfig } = props;
  const handleClick = (value) => () => {
    onConfig()({
      [name]: value
    });
  };
  return (
    <div className="rule-item">
      <span className="rule-item-name">{name}</span>
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
  );
};

export default RuleItem;
