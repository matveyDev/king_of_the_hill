import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'

import '../../styles/gamePanel.css';
import config from '../../config.json';
import { contractInstance } from '../../App';


const NoWinner = 'No winner';


const CurrentWinner = (props) => {
  const { account } = useWeb3React();
  const [curWinner, setCurWinner] = useState('');

  useEffect(() => {
    _setCurWinner();
  });

  const _checkAndSetCurWinner = (_error) => {
    if (_error) {
      console.log(_error);
    } else {
      _setCurWinner();
    };
  };

  const _setCurWinner = async () => {
    const _curWinner = await contractInstance.methods.highestCallerAddress().call();
    if (_curWinner.toLowerCase() == config.CONTRACT_ADDRESS.toLowerCase()) {
      setCurWinner(NoWinner);
    } else {
      setCurWinner(_curWinner);
    };
  };

  contractInstance.events.NewRound(
    (error) => _checkAndSetCurWinner(error)
  );
  contractInstance.events.NewDeposit(
    (error) => _checkAndSetCurWinner(error)
  );

  const renderCurWinner = () => {
    if (curWinner.length == 42) {
      return `Current Winner: ${curWinner.slice(0, 6)}...${curWinner.slice(curWinner.length - 4)}`;
    } else {
      return `Current Winner: ${curWinner}`;
    };
  }

  return (
    <div {...props}>
      {curWinner == account
        ?
        "Current Winner: You're winner"
        :
        <a {...props} target='_blank' href={config.ETHERSCAN_URL + curWinner}>
          {renderCurWinner()}
        </a>
      }
    </div>
  );
}

export default CurrentWinner;
