import React from 'react';

import '../../styles/gamePanel.css';
import CurrentWinner from '../contractData/CurrentWinner';
import RoundStatus from '../contractData/RoundStatus';
import PrizePool from '../contractData/PrizePool';
import RoundTime from '../contractData/RoundTime';
import DepositForm from '../forms/DepositForm';


const GamePanel = () => {
  return (
    <div className='main__right-panels'>
      <div className='panel panel__game_main z-depth-5'>
        <CurrentWinner className='panel_text currunt_winner' />
        <RoundTime className='panel_text' />
        <DepositForm />
      </div>
      <div className='panel z-depth-5'>
        <RoundStatus className='panel_text' />
      </div>
      <div className='panel z-depth-5'>
        <PrizePool className='panel_text' />
      </div>
    </div>
  );
};

export default GamePanel;
