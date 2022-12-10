import React from 'react';
import { useSelector } from 'react-redux';

import '../../../styles/gamePanel.css';
import CurrentWinner from '../CurrentWinner';
import RoundStatus from '../RoundStatus';
import PrizePool from '../PrizePool';
import RoundTime from '../RoundTime';
import DepositForm from '../../forms/DepositForm';


const GamePanel = () => {
  const needRefresh = useSelector((state) => state.round.needRefresh);

  return (
    <div className='mainGamePanel'>
      <div className='gamePanel gamePanelStatus z-depth-5'>
        <CurrentWinner className='gamePanel__text currunt_winner' />
        <RoundTime className='gamePanel__text' />
        {needRefresh && <DepositForm />}
      </div>
      <div className='gamePanel z-depth-5'>
        <RoundStatus className='gamePanel__text' />
      </div>
      <div className='gamePanel z-depth-5'>
        <PrizePool className='gamePanel__text prize_pool_component' />
      </div>
    </div>
  );
};

export default GamePanel;
