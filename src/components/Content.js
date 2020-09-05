import React, { useContext, useEffect } from 'react';
import Pipe from './Pipe';
import { StoreContext } from '../context/StoreContext';
import { ThemeContext } from '../context/ThemeContext';
import { generateRandomData } from '../util/util-functions';

const Content = () => {
  const [currentTheme] = useContext(ThemeContext);
  const [data, setData] = useContext(StoreContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setData(generateRandomData(50)), []);

  const pipeElements = data.map((height, index) => (
    <Pipe height={height} key={index}></Pipe>
  ));

  return (
    <div
      className='h-100 d-flex justify-content-center align-items-center'
      style={{ backgroundColor: currentTheme.colorPallet.main }}
    >
      <div style={{ minWidth: 300, minHeight: 500 }}>
        <div
          style={{
            borderBottom: `2px solid ${currentTheme.colorPallet.third}`,
          }}
        >
          {pipeElements}
        </div>
        <div
          className='font-2d sort-algorithm-name'
          style={{ color: currentTheme.colorPallet.third }}
        >
          Sortarea prin interschimbare
        </div>
      </div>
    </div>
  );
};

export default Content;
