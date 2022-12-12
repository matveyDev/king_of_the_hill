import React from 'react';

import '../../styles/settingsPanel.css';
import RoundTime from '../contractData/RoundTime';
import ComissionRate from '../contractData/ComissionRate';

const SettingPanel = () => {

  return (
    <div className='panel panel__settings'>
      <div className='panel_text'>Settings:</div>
      <RoundTime className='panel_text'/>
      <ComissionRate className='panel_text'/>
    </div>
  );
};

export default SettingPanel;
