import React, { useState } from 'react';
import { getRandomNumber } from '../util/util-functions';

export const StoreContext = React.createContext();

export const StoreProvider = (props) => {
  const initialData = Array(50)
    .fill()
    .map((val, index) => ({
      value: getRandomNumber(),
      offsetLeft: 0,
      refDOM: React.createRef(),
      status: 'NONE',
      actualIndex: index,
    }));

  const state = useState(initialData);

  return (
    <StoreContext.Provider value={state}>
      {props.children}
    </StoreContext.Provider>
  );
};
