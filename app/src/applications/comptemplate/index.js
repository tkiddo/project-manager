import React, { useEffect } from 'react';
import './index.scss';
import CustomScroll from '../../components/CustomScroll';

const CompTemplate = () => {
  useEffect(() => {}, []);
  return (
    <CustomScroll height="600px">
      <div className="comp-manage-list">content</div>
    </CustomScroll>
  );
};

export default CompTemplate;
