import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

const CustomScroll = (props) => {
  const { height, children } = props;
  return (
    <div className="scroll-outer" style={{ height }}>
      {children}
    </div>
  );
};

export default CustomScroll;

CustomScroll.propTypes = {
  height: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

CustomScroll.defaultProps = {
  height: '600px',
  children: null
};
