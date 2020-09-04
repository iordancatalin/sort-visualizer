import React from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faCog } from '@fortawesome/free-solid-svg-icons';

library.add(faPlay);
library.add(faCog);

function App() {
  return (
    <div className='h-100'>
      <div className='header-container'>
        <Header></Header>
      </div>

      <div className='content-container'>
        <Content></Content>
      </div>
    </div>
  );
}

export default App;
