import React from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faCog } from '@fortawesome/free-solid-svg-icons';
import { StoreProvider } from './context/StoreContext';
import { ThemeProvider } from './context/ThemeContext';

library.add(faPlay);
library.add(faCog);

function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <div className='h-100'>
          <div className='header-container'>
            <Header></Header>
          </div>

          <div className='content-container'>
            <Content></Content>
          </div>
        </div>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
