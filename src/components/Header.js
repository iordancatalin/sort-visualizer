import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StoreContext } from '../context/StoreContext';
import { ThemeContext } from '../context/ThemeContext';
import { generateRandomData, getRandomNumber } from '../util/util-functions';

function Header() {
  const [currentTheme] = useContext(ThemeContext);
  const [data, setData] = useContext(StoreContext);

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
  const handleGenerateButton = () =>
    setData(
      Array(50)
        .fill()
        .map((value, index) => ({
          value: getRandomNumber(),
          offsetLeft: 0,
          refDOM: React.createRef(),
          status: 'NONE',
          actualIndex: index,
        }))
    );

  const resetStatusForIndexes = (indexOne, indexTwo) =>
    setData((prevData) =>
      prevData.map((value, index) => {
        return { ...value, status: 'NONE' };
      })
    );

  const calculateOffsetLeftAndStatusForTwoDatas = (dataOne, dataTwo) => {
    const offsetLeftDOM1 = dataOne.refDOM.current.offsetLeft;
    const offsetLeftDOM2 = dataTwo.refDOM.current.offsetLeft;

    const diffAbsolute = Math.abs(offsetLeftDOM1 - offsetLeftDOM2);

    if (offsetLeftDOM1 < offsetLeftDOM2) {
      const resultOne = {
        offsetLeft: dataOne.offsetLeft + diffAbsolute,
        status: 'MOVE_TO_RIGHT',
      };

      const resultTwo = {
        offsetLeft: dataTwo.offsetLeft - diffAbsolute,
        status: 'MOVE_TO_LEFT',
      };

      return [resultOne, resultTwo];
    }

    const resultOne = {
      offsetLeft: dataOne.offsetLeft - diffAbsolute,
      status: 'MOVE_TO_LEFT',
    };

    const resultTwo = {
      offsetLeft: dataTwo.offsetLeft + diffAbsolute,
      status: 'MOVE_TO_RIGHT',
    };

    return [resultOne, resultTwo];
  };

  const interchange = (indexOne, indexTwo) => {
    setData((prevData) => {
      const data1 = prevData.find((value) => value.actualIndex === indexOne);
      const data2 = prevData.find((value) => value.actualIndex === indexTwo);

      const [result1, result2] = calculateOffsetLeftAndStatusForTwoDatas(
        data1,
        data2
      );

      return prevData.map((value) => {
        if (value.actualIndex === indexOne) {
          return {
            ...value,
            offsetLeft: result1.offsetLeft,
            status: result1.status,
            actualIndex: indexTwo,
          };
        }

        if (value.actualIndex === indexTwo) {
          return {
            ...value,
            offsetLeft: result2.offsetLeft,
            status: result2.status,
            actualIndex: indexOne,
          };
        }

        return value;
      });
    });
  };

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
        interchange(result.from, result.to);
        setTimeout(() => {
          resetStatusForIndexes(result.from, result.to);
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
