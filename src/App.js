import React from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';

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
