import React from 'react';

import '../styles/homePage.css';
import AccountPanel from '../components/panels/AccountPanel';
import SettingPanel from '../components/panels/SettingsPanel';
import TopUsersPanel from '../components/panels/TopUsersPanel';
import GamePanel from '../components/panels/GamePanel';


const HomePage = () => {
  return (
    <div className='homePage container'>
      <div className='panels'>
        <div className='left-panels'>
          <AccountPanel/>
          <SettingPanel/>
          <TopUsersPanel/>
        </div>
        <div className='right-panels'>
          <GamePanel/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
