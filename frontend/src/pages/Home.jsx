import React from 'react';

import '../styles/homePage.css';
import AccountPanel from '../components/HomeInteface/Panels/AccountPanel';
import GamePanel from '../components/HomeInteface/Panels/GamePanel';


const HomePage = () => {
  return (
    <div className='homePage container'>
      <div className='panels'>
        <div className='left-panels'>
          <AccountPanel/>
          <AccountPanel/>
          <AccountPanel/>
        </div>
        <div className='right-panels'>
          <GamePanel/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
