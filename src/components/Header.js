import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  return (
    <header className='h-100 theme-marine-second d-flex'>
      <div className='h-100 d-inline-flex align-items-center col-3'>
        <button className='font-2d relief-btn theme-marine-relief-btn'>
          Generate
        </button>
      </div>

      <div className='h-100 d-inline-flex justify-content-center col-3 position-relative'>
        <button className='run-btn theme-marine-run-btn'>
          <FontAwesomeIcon icon='play' size='lg' />
        </button>
      </div>
      <div className='h-100 d-inline-flex align-items-center justify-content-end col-3'>
        <button className='settings-btn theme-marine-main-color'>
          <FontAwesomeIcon icon='cog' size='lg' />
        </button>
      </div>
    </header>
  );
}

export default Header;
