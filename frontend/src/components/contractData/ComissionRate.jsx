import React, { useState, useEffect } from 'react';

import { contractInstance, web3 } from '../../App';


const ComissionRate = (props) => {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    _setRate();
  }, [])

  const _setRate = async () => {
    let _rate = await contractInstance.methods.comissionRateToWithdraw().call();
    _rate = web3.utils.fromWei(_rate, 'ether');
    setRate(_rate);
  };

  contractInstance.events.NewComissionRateToWithdraw(
    async (error) => {
      if (error) {
        console.log(error);
      } else {
        _setRate();
      };
    }
  );

  return (
    <div {...props}>
      Rate: {rate} ETH
    </div>
  );
};

export default ComissionRate;
