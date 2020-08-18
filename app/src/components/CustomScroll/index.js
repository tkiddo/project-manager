import React from 'react';
import './index.scss';

const CustomScroll = (props) => {
  const { height, children } = props;
  return (
    <div className="scroll-outer" style={{ height }}>
      {children}
    </div>
  );
};

export default CustomScroll;
