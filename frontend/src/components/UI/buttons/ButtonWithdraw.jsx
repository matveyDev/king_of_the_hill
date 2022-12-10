import React from 'react';

import { contractInstance } from '../../../App';
import '../../../styles/accountPanel.css';


const ButtonWithdraw = ({from}) => {

  const withdrawPrize = async () => {
    if (!from) { return; };
    const commisionRate = await contractInstance.methods.comissionRateToWithdraw().call();
    await contractInstance.methods.withdrawPrize().send({
      from: from,
      value: commisionRate
    })
  };

  return (
    <button className='btn blue lighten-3 waves-effect' onClick={withdrawPrize}>Withdraw Prize</button>
  )
};

export default ButtonWithdraw;
