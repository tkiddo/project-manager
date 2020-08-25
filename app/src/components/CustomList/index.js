import React from 'react';
import './index.scss';

const CustomList = (props) => {
  const { data, template, more } = props;
  const Template = template;
  return (
    <>
      {data.length === 0 && <div>无数据</div>}
      {data.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Template {...item} {...more} />
      ))}
    </>
  );
};

export default CustomList;
