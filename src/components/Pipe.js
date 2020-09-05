import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Pipe = ({ height }) => {
  const [currentTheme] = useContext(ThemeContext);
  const style = { backgroundColor: currentTheme.colorPallet.third, height };

  return <div style={style} className='pipe'></div>;
};

export default Pipe;
