import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux';

import { setNeedRefresh } from '../../store/roundSlice';
import { contractInstance } from '../../App';
import ButtonRefreshRound from '../UI/buttons/ButtonRefreshRound';


const RoundStatus = (props) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const [timeLastDeposit, setTimeLastDeposit] = useState();
  const [roundTime, setRoundTime] = useState(0);
  const [roundStatus, setRoundStatus] = useState(0);


  useEffect(() => {
    contractInstance.events.NewRound(
      async (error) => _checkAndSetTimeLastDeposit(error)
    );
    contractInstance.events.NewDeposit(
      async (error) => _checkAndSetTimeLastDeposit(error)
    );
    contractInstance.events.SetNewRoundTime(
      async () => _setRoundTime()
    );

    _setInit();

    const interval = setInterval(() => {
      let time = (Date.now() - (Date.now() % 1000)) / 1000;
      let _roundStatus = (time - timeLastDeposit);

      if (_roundStatus > roundTime) {
        setRoundStatus(0);
        dispatch(setNeedRefresh(true));
      } else {
        time = (Date.now() - (Date.now() % 1000)) / 1000;
        _roundStatus = (time - timeLastDeposit);
        setRoundStatus(roundTime - _roundStatus);
        dispatch(setNeedRefresh(false));
      };
    }, 1000)

    return () => clearInterval(interval);
  });

  const _setInit = async () => {
    _setTimeLastDeposit();
    _setRoundTime();
  };

  const _checkAndSetTimeLastDeposit = async (_error) => {
    if (_error) {
      console.log(_error);
    } else {
      let _timeLastDeposit = await contractInstance.methods.timeStampLastDeposit().call();
      _timeLastDeposit = Number(_timeLastDeposit);
      setTimeLastDeposit(_timeLastDeposit);
    };
  };

  const _setTimeLastDeposit = async () => {
    let _timeLastDeposit = await contractInstance.methods.timeStampLastDeposit().call();
    _timeLastDeposit = Number(_timeLastDeposit);
    setTimeLastDeposit(_timeLastDeposit);
  };

  const _setRoundTime = async () => {
    let _roundTime = await contractInstance.methods.roundTime().call();
    _roundTime = Number(_roundTime);
    setRoundTime(_roundTime);
  };

  return (
    <div>
      {roundStatus != 0
        ?
        <div {...props}>Round End's in: {roundStatus}</div>
        :
        <div {...props}>Round End's in: <ButtonRefreshRound from={account} /></div>
      }
    </div>
  );
};

export default RoundStatus;
