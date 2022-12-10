import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { useSelector, useDispatch } from 'react-redux';

import '../../../styles/accountPanel.css';
import { contractInstance, web3 } from '../../../App';
import { injected } from "../../wallet/connectors"
import InlineAccount from '../../UI/inlineBlocks/InlineAccount';
import { setAddress, setBalance, setTotalPrize } from '../../../store/accountSlice';
import ButtonWithdraw from '../../UI/buttons/ButtonWithdraw';


const AccountPanel = () => {
  const dispatch = useDispatch();
  const { account, activate } = useWeb3React();
  let accountAddress = useSelector(state => state.account.address)
  let accountBalance = useSelector(state => state.account.balance)
  let accountTotalPrize = useSelector(state => state.account.totalPrize)

  const isConnected = () => {
    return accountAddress.length == 42;
  };

  if (isConnected()) {
    accountAddress = `${accountAddress.slice(0, 6)}...${accountAddress.slice(accountAddress.length - 4)}`
    accountBalance += ' ETH';
    accountTotalPrize += ' ETH';
  };

  useEffect(() => {
    if (!window.ethereum) { return; };
    _activate();

  }, []);

  const _activate = async () => {
    activate(injected);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      const address = accounts[0];
      _setAccount(address, false);
    };
  };

  contractInstance.events.NewRound(
    async (error) => {
      const accounts = await web3.eth.getAccounts();
      _checkAndSetAccount(error, accounts[0]);
    }
  );

  contractInstance.events.WithdrawPrize(
    async (error, event) => {
      _checkAndSetAccount(error, event.returnValues._address);
    }
  );

  contractInstance.events.NewDeposit(
    async (error, event) => {
      _checkAndSetAccount(error, event.returnValues.from);
    }
  );

  const _checkAndSetAccount = async (error, address) => {
    if (error) { console.log(error); }
    else {
      _setAccount(address, true);
    };
  };

  const _setAccount = async (_address, checkOnAddress) => {
    if (checkOnAddress && _address != accountAddress) { return; };

    let _balance = await web3.eth.getBalance(_address);
    _balance = web3.utils.fromWei(_balance, 'ether').slice(0, 7);
    let _prize = await contractInstance.methods.winnerToPrize(_address).call();
    _prize = web3.utils.fromWei(_prize, 'ether').slice(0, 7);

    dispatch(setAddress(_address));
    dispatch(setBalance(_balance));
    dispatch(setTotalPrize(_prize));
    accountAddress = _address;
    accountBalance = _balance;
    accountTotalPrize = _prize;
  };

  return (
    <div className='panel panel__account z-depth-5'>
      <InlineAccount text={`Wallet Connected: ${accountAddress}`} props={{className: 'panel_text'}} />
      <InlineAccount text={`Balance: ${accountBalance}`} props={{className: 'panel_text'}} />
      <InlineAccount text={`Total Prize: ${accountTotalPrize}`} props={{className: 'panel_text'}} />
      <div className='withdraw_block'>
        {accountTotalPrize > 0 && <div><ButtonWithdraw from={account} /></div>}
      </div>
    </div>
  );
};

export default AccountPanel;
