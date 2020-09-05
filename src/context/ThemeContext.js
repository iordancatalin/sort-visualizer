import React, { useState } from 'react';
import { marineTheme } from '../Themes';

export const ThemeContext = React.createContext();

export const ThemeProvider = (props) => {
  const state = useState(marineTheme);

  return (
    <ThemeContext.Provider value={state}>
      {props.children}
    </ThemeContext.Provider>
  );
};
