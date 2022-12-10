import React from 'react';
import { useWeb3React } from '@web3-react/core'

import { injected } from "../../../components/wallet/connectors"
import { web3, contractInstance } from '../../../App';

import { useDispatch } from 'react-redux';
import { setAddress, setBalance, setTotalPrize } from '../../../store/accountSlice';


const notConnected = 'not connected'


const ButtonConnect = () => {
  const { activate } = useWeb3React();
  const dispatch = useDispatch();

  if (window.ethereum) {
    window.ethereum.on('accountsChanged', async () => {
      onConnect();
    });
  } else {
    dispatch(setAddress(notConnected));
    dispatch(setBalance(notConnected));
    dispatch(setTotalPrize(notConnected));
  };

  const onConnect = async () => {
    activate(injected);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      const address = accounts[0];
      const balance = await web3.eth.getBalance(address);
      const prize = await contractInstance.methods.winnerToPrize(address).call();

      dispatch(setAddress(address));
      dispatch(setBalance(
        web3.utils.fromWei(balance, 'ether').slice(0, 7)
      ));
      dispatch(setTotalPrize(
        web3.utils.fromWei(prize, 'ether').slice(0, 7)
      ));
    };
  };

  return (
    <button
      className='btn btn__connect blue lighten-3 waves-effect'
      onClick={onConnect}>Connect
    </button>
  )
};

export default ButtonConnect;
