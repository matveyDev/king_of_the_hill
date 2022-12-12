import React from 'react';

import { contractInstance, web3 } from '../../../App';


const ButtonDeposit = (props, { from, input }) => {
  const onDeposit = async () => {
    const value = input.current.value;
    if (!value) { return; }
    const _value = web3.utils.toWei(value, 'ether');
    await contractInstance.methods.deposit().send({
      from: from,
      value: _value
    }).then(() => {
      alert('Successful deposit!')
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <button
      className='btn btn__deposit blue lighten-3 waves-effect'
      onClick={onDeposit}
      {...props}
    >Deposit
    </button>
  );
};

export default ButtonDeposit;
