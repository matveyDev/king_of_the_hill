import React, { useState, useEffect } from 'react';

import { contractInstance, web3 } from '../../App';


const PrizePool = (props) => {
  const [prizePool, setPrizePool] = useState(0);

  useEffect(() => {
    contractInstance.events.NewRound(
      (error) => _checkAndSetPrizePool(error)
    );
    contractInstance.events.NewDeposit(
      (error) => _checkAndSetPrizePool(error)
    );

    _setPrizePool();
  }, []);

  const _checkAndSetPrizePool = (_error) => {
    if (_error) {
      console.log(_error);
    } else {
      _setPrizePool();
    };
  };

  const _setPrizePool = async () => {
    let _prizePool = await contractInstance.methods.prizePool().call();
    _prizePool = web3.utils.fromWei(_prizePool);
    setPrizePool(_prizePool);
  };

  return (
    <div {...props}>
      Prize Pool: {prizePool}
    </div>
  );
};

export default PrizePool;
