import React, { useContext, useEffect } from 'react';
import Pipe from './Pipe';
import { StoreContext, GENERATE_DATA } from '../context/StoreContext';
import { ThemeContext } from '../context/ThemeContext';

const Content = () => {
  const [currentTheme] = useContext(ThemeContext);
  const [data, dispatch] = useContext(StoreContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch({ type: GENERATE_DATA }), []);

  const getBgColorByStatus = (status) => {
    switch (status) {
      case 'MOVE_TO_LEFT': return 'red';
      case 'MOVE_TO_RIGHT': return 'orange';
      default: return currentTheme.colorPallet.third;
    }
  };

  const pipeElements = data.map((data, index) => (
    <Pipe
      data={data}
      key={index}
      backgroundColor={getBgColorByStatus(data.status)}
    ></Pipe>
  ));

  return (
    <div
      className='h-100 d-flex justify-content-center align-items-center'
      style={{ backgroundColor: currentTheme.colorPallet.main }}
    >
      <div style={{ minWidth: 300, minHeight: 500 }}>
        <div
          className='position-relative'
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
