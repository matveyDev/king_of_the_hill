import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { useSelector, useDispatch } from 'react-redux';

import '../../../styles/accountPanel.css';
import { contractInstance, web3 } from '../../../App';
import { injected } from "../../wallet/connectors"
import { setAddress, setBalance, setTotalPrize } from '../../../store/accountSlice';

import ButtonWithdraw from '../../UI/buttons/ButtonWithdraw';
import InlineAccount from '../../UI/inlineBlocks/InlineAccount';


const AccountPanel = () => {
  const dispatch = useDispatch();
  const { account, activate } = useWeb3React();
  const accountAddress = useSelector(state => state.account.address)
  const accountBalance = useSelector(state => state.account.balance)
  const accountTotalPrize = useSelector(state => state.account.totalPrize)

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
  };

  const isAddress = (_address) => {
    return _address.length == 42;
  };

  const renderAddress = () => {
    let displayedAddress;
    if (isAddress(accountAddress)) {
      displayedAddress = `${accountAddress.slice(0, 6)}...${accountAddress.slice(accountAddress.length - 4)}`
    } else {
      displayedAddress = accountAddress;
    };
    return (<InlineAccount text={`Wallet Connected: ${displayedAddress}`} props={{className: 'panel_text'}} />);
  };

  const renderBalance = () => {
    return (<InlineAccount text={`Balance: ${accountBalance}`} props={{className: 'panel_text'}} />);
  };

  const renderTotalPrize = () => {
    return (<InlineAccount text={`Total Prize: ${accountTotalPrize}`} props={{className: 'panel_text'}} />);
  };

  return (
    <div className='panel panel__account z-depth-5'>
      {renderAddress()}
      {renderBalance()}
      {renderTotalPrize()}
      <div className='withdraw_block'>
        {accountTotalPrize > 0 && <div><ButtonWithdraw from={account} /></div>}
      </div>
    </div>
  );
};

export default AccountPanel;
