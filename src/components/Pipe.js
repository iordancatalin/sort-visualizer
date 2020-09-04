import React from 'react';

const Pipe = ({ height, key }) => {
  return (
    <div
      key={key}
      style={{ height: height }}
      className='pipe theme-marine-third'
    ></div>
  );
};

export default Pipe;
