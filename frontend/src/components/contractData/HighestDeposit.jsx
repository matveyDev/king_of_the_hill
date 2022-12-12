import React, { useState, useEffect } from 'react';

import { contractInstance, web3 } from '../../App';


const HighestDeposit = (props) => {
  const [highestDeposit, setHighestDeposit] = useState(0);

  const _setHighestDeposit = async () => {
    let _highestDeposit = await contractInstance.methods.highestDeposit().call();
    _highestDeposit = web3.utils.fromWei(_highestDeposit, 'ether');
    setHighestDeposit(_highestDeposit);
  };

  useEffect(() => {
    _setHighestDeposit();
  }, []);

  contractInstance.events.NewDeposit(
    async () => _setHighestDeposit()
  );

  contractInstance.events.NewRound(
    async () => setHighestDeposit(0)
  );

  return (
    <div {...props}>
      Highest Deposit: {highestDeposit} ETH
    </div>
  );
};

export default HighestDeposit;
