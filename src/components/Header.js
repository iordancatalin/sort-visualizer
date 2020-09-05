import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StoreContext } from '../context/StoreContext';
import { ThemeContext } from '../context/ThemeContext';
import { generateRandomData } from '../util/util-functions';

function Header() {
  const [currentTheme] = useContext(ThemeContext);
  const [, setData] = useContext(StoreContext);

  const generateStyle = {
    backgroundColor: currentTheme.colorPallet.fourth,
    color: currentTheme.colorPallet.third,
    boxShadow: `inset 0 -6px ${currentTheme.colorPallet.fifth}`,
  };

  const runStyle = {
    backgroundColor: currentTheme.colorPallet.six,
    color: currentTheme.colorPallet.third,
  };

  const settingsStyle = { color: currentTheme.colorPallet.third };

  const handleGenerateButton = () => setData(generateRandomData(40));

  return (
    <header
      className='h-100 d-flex'
      style={{ backgroundColor: currentTheme.colorPallet.second }}
    >
      <div className='h-100 d-inline-flex align-items-center col-3'>
        <button
          className='font-2d relief-btn'
          style={generateStyle}
          onClick={handleGenerateButton}
        >
          Generate
        </button>
      </div>

      <div className='h-100 d-inline-flex justify-content-center col-3 position-relative'>
        <button className='run-btn' style={runStyle}>
          <FontAwesomeIcon icon='play' size='lg' />
        </button>
      </div>
      <div className='h-100 d-inline-flex align-items-center justify-content-end col-3'>
        <button className='settings-btn' style={settingsStyle}>
          <FontAwesomeIcon icon='cog' size='lg' />
        </button>
      </div>
    </header>
  );
}

export default Header;
