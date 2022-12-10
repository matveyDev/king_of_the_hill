import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'

import '../styles/App.css';
import { contractInstance, web3 } from '../App';
import ConnectionForm from '../components/forms/ConnectionForm'
import ButtonWithdraw from '../components/UI/buttons/ButtonWithdraw';
import PrizePool from '../components/HomeInteface/PrizePool';
import RoundTime from '../components/HomeInteface/RoundTime';
import RoundStatus from '../components/HomeInteface/RoundStatus';
import ButtonRefreshRound from '../components/UI/buttons/ButtonRefreshRound';
import DepositForm from '../components/forms/DepositForm';
import CurrentWinner from '../components/HomeInteface/CurrentWinner';

import AccountPanel from '../components/HomeInteface/Panels/AccountPanel';
import GamePanel from '../components/HomeInteface/Panels/GamePanel';


const HomePage = () => {
  const { account } = useWeb3React();
  const [prizeExists, setPrizeExists] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [availableToDeposit, setAvailableToDeposit] = useState(false);

  useEffect(() => {
    _setPrizeExists()
    const interval = _setInterval();

    return () => clearInterval(interval);
  }, []);

  const _setInterval = async () => {
    const interval = setInterval(async () => {  
      let timeLastDeposit = await contractInstance.methods.timeStampLastDeposit().call();
      timeLastDeposit = Number(timeLastDeposit);
      let roundTime = await contractInstance.methods.roundTime().call();
      roundTime = Number(roundTime);
      let timeNow = (Date.now() - (Date.now() % 1000)) / 1000;

      if (timeNow - timeLastDeposit > roundTime) {
        setNeedRefresh(true);
        setAvailableToDeposit(false);
      } else {
        setNeedRefresh(false);
        setAvailableToDeposit(true);
      };
    }, 1000);
  };

  const _setPrizeExists = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const prize = await contractInstance.methods.winnerToPrize(address).call();

    if (prize > 0) {
      setPrizeExists(true);
    } else {
      setPrizeExists(false);
    };
  };

  const _checkAndSetPrizeExists = async (_error) => {
    if (_error) {
      console.log(_error);
    } else {
      _setPrizeExists();
    }
  };

  contractInstance.events.WithdrawPrize(
    (error) => _checkAndSetPrizeExists(error)
  );

  contractInstance.events.NewWinner(
    (error) => _setPrizeExists(error)
  );

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
      {/* <ConnectionForm/>
      <PrizePool/>
      <RoundTime/>
      <RoundStatus/>
      <CurrentWinner/>
      {needRefresh && <div><ButtonRefreshRound from={account} /></div>}
      {availableToDeposit && <DepositForm/>} */}
    </div>
  );
}

export default HomePage;
