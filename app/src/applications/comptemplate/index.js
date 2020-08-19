import React, { useEffect } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import CustomScroll from '../../components/CustomScroll';

const CompTemplate = () => {
  useEffect(() => {}, []);
  return (
    <Container fluid className="padding-top-10">
      <CustomScroll height="600px">
        <div className="comp-manage-list">content</div>
      </CustomScroll>
    </Container>
  );
};

export default CompTemplate;
