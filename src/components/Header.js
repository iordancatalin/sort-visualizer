import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  StoreContext,
  GENERATE_DATA,
  INTERCHANGE,
  RESET_STATUS,
} from '../context/StoreContext';
import { ThemeContext } from '../context/ThemeContext';

function Header() {
  const [currentTheme] = useContext(ThemeContext);
  const [data, dispatch] = useContext(StoreContext);

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
  const handleGenerateButton = () => dispatch({ type: GENERATE_DATA });

  const sort = () => {
    const results = [];
    const cheapData = data.map((val) => val.value);

    for (let i = 0; i < cheapData.length - 1; i++) {
      for (let j = i + 1; j < cheapData.length; j++) {
        if (cheapData[data[i].actualIndex] > cheapData[data[j].actualIndex]) {
          results.push({ from: data[i].actualIndex, to: data[j].actualIndex });

          const aux = cheapData[data[i].actualIndex];
          cheapData[data[i].actualIndex] = cheapData[data[j].actualIndex];
          cheapData[data[j].actualIndex] = aux;
        }
      }
    }

    return results;
  };

  const handleRunButton = async () => {
    const results = sort();

    const functions = results.map((result) => () =>
      new Promise((resolve, reject) => {
        dispatch({
          type: INTERCHANGE,
          indexOne: result.from,
          indexTwo: result.to,
        });
        setTimeout(() => {
          dispatch({ type: RESET_STATUS });
          resolve(0);
        }, 400);
      })
    );

    for (const funct of functions) {
      await funct();
    }
  };

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
        <button className='run-btn' style={runStyle} onClick={handleRunButton}>
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
