import React, { useState } from 'react';

export const StoreContext = React.createContext();

export const StoreProvider = (props) => {
  const state = useState([]);

  return (
    <StoreContext.Provider value={state}>
      {props.children}
    </StoreContext.Provider>
  );
};
