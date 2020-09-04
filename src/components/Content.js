import React from 'react';
import Pipe from './Pipe';

const Content = () => {
  const pipeElements = Array(50)
    .fill(0)
    .map(() => Math.ceil(Math.random() * 500))
    .map((height, index) => <Pipe height={height} key={index}></Pipe>);

  return (
    <div className='h-100 theme-marine-main d-flex justify-content-center align-items-center'>
      <div style={{ minWidth: 300, minHeight: 500 }}>
        <div className='pipes-container'>{pipeElements}</div>
        <div className='font-2d sort-algorithm-name'>
          Sortarea prin interschimbare
        </div>
      </div>
    </div>
  );
};

export default Content;
