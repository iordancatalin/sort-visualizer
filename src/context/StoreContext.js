import React, { useReducer } from 'react';
import { getRandomNumber } from '../util/util-functions';

export const StoreContext = React.createContext();

export const GENERATE_DATA = 'GENERATE_DATA';
export const INTERCHANGE = 'INTERCHANGE';
export const RESET_STATUS = 'RESET_STATUS';

const resetStatus = (data) =>
  data.map((value) => ({ ...value, status: 'NONE' }));

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

const createNewData = (oldData, result) => {
  return result == null
    ? oldData
    : {
        ...oldData,
        offsetLeft: result.offsetLeft,
        status: result.status,
        actualIndex: result.actualIndex,
      };
};

const interchange = (data, indexOne, indexTwo) => {
  const data1 = data.find((value) => value.actualIndex === indexOne);
  const data2 = data.find((value) => value.actualIndex === indexTwo);

  const [result1, result2] = calculateOffsetLeftAndStatusForTwoDatas(
    data1,
    data2
  );

  result1.actualIndex = indexTwo;
  result2.actualIndex = indexOne;

  return data.map((value) => {
    if (value.actualIndex === indexOne) {
      return createNewData(value, result1);
    }

    if (value.actualIndex === indexTwo) {
      return createNewData(value, result2);
    }

    return value;
  });
};

const generateData = () =>
  Array(50)
    .fill()
    .map((val, index) => ({
      value: getRandomNumber(),
      offsetLeft: 0,
      refDOM: React.createRef(),
      status: 'NONE',
      actualIndex: index,
    }));

const dataReducer = (state, action) => {
  switch (action.type) {
    case GENERATE_DATA:
      return generateData();
    case INTERCHANGE:
      return interchange(state, action.indexOne, action.indexTwo);
    case RESET_STATUS:
      return resetStatus(state);
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const reducerResult = useReducer(dataReducer, []);

  return (
    <StoreContext.Provider value={reducerResult}>
      {props.children}
    </StoreContext.Provider>
  );
};
