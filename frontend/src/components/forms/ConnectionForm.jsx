import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'

import '../../styles/connectionForm.css';
import { contractInstance, web3 } from '../../App';
import { injected } from "../wallet/connectors"

import { useSelector, useDispatch } from 'react-redux';


const ConnectionForm = () => {
  const address = useSelector((state) => state.account.address);
  const balance = useSelector((state) => state.account.balance);
  const totalPrize = useSelector((state) => state.account.totalPrize);

  const { activate } = useWeb3React();
  const [account, setAccount] = useState({
    address: 'not connected',
    balance: 'not connected',
    prize: 'not connected',
  });

  // useEffect(() => {
  //   if (window.ethereum) {
  //     _activate();
  //   };

  // }, []);

  const _activate = async () => {
    activate(injected);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      const address = accounts[0];
      _setAccount(address, false);
    };
  };

  const _checkAndSetAccount = async (error, address) => {
    if (error) { console.log(error); }
    else {
      _setAccount(address, true);
    };
  };

  const _setAccount = async (_address, checkOnAddress) => {
    if (checkOnAddress && _address != account.address) { return; };

    const _balance = await web3.eth.getBalance(_address);
    const _prize = await contractInstance.methods.winnerToPrize(_address).call();
    setAccount({
      address: _address,
      balance: web3.utils.fromWei(_balance, 'ether').slice(0, 7),
      prize: web3.utils.fromWei(_prize, 'ether').slice(0, 7)
    });
  };

  contractInstance.events.NewRound(
    async (error) => {
      const accounts = await web3.eth.getAccounts();
      _checkAndSetAccount(error, accounts[0]);
  });

  contractInstance.events.WithdrawPrize(
    async (error, event) => {
      _checkAndSetAccount(error, event.returnValues._address);
  });

  contractInstance.events.NewDeposit(
    async (error, event) => {
      _checkAndSetAccount(error, event.returnValues.from);
  });

  return (
    <div className='connectionForm z-depth-5'>
      <div className='address'>Address: {address}</div>
      <div className='balance'>Balance: {balance}</div>
      <div className='totalPrize'>Total prize: {totalPrize}</div>
    </div>
  );
}

export default ConnectionForm;
