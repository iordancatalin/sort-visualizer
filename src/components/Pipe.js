import React from 'react';

const Pipe = ({ data, backgroundColor }) => {
  const style = { backgroundColor, height: data.value, left: data.offsetLeft };

  return (
    <div
      style={style}
      ref={data.refDOM}
      className='pipe position-relative'
    ></div>
  );
};

export default Pipe;
