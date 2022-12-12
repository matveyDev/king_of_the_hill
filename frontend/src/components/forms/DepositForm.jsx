import React, { useRef } from 'react';
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux';

import ButtonDeposit from '../UI/buttons/ButtonDeposit';
import InputDeposit from '../UI/inputs/InputDeposit';


const DepositForm = () => {
  const { account } = useWeb3React();
  const inputDeposit = useRef();
  const needRefresh = useSelector((state) => state.round.needRefresh);

  const renderButtonDeposit = () => {
    if (!needRefresh) {
      return (
        <ButtonDeposit
          from={account}
          input={inputDeposit}
        />
      );
    } else {
      return (
        <ButtonDeposit
          from={account}
          input={inputDeposit}
          disabled
        />
      );
    };
  };

  return (
    <div className='deposit_form'>
      <form onSubmit={(event) => event.preventDefault()}>
        <InputDeposit
          defaultValue='0.02'
          ref={inputDeposit}
        />
        {renderButtonDeposit()}
      </form>
    </div>
  );
};

export default DepositForm;
