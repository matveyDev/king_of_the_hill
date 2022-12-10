import React from 'react';
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux';

import { setAddress, setBalance, setTotalPrize } from '../../../store/accountSlice';


const notConnected = 'not connected'


const ButtonDisconnect = () => {
  const { deactivate } = useWeb3React();
  const dispatch = useDispatch();

  const onDisconnect = async () => {
    deactivate();
    setNotConnected();
  };

  const setNotConnected = () => {
    dispatch(setAddress(notConnected));
    dispatch(setBalance(notConnected));
    dispatch(setTotalPrize(notConnected));
  };

  return (
    <button 
      className='btn btn__disconnect blue lighten-3 waves-effect' 
      onClick={onDisconnect}>Disconnect
    </button>
  )
};

export default ButtonDisconnect;
