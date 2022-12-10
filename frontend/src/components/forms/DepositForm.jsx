import React, { useRef } from 'react';
import { useWeb3React } from '@web3-react/core'

import ButtonDeposit from '../UI/buttons/ButtonDeposit';
import InputDeposit from '../UI/inputs/InputDeposit';


const DepositForm = () => {
  const { account } = useWeb3React();
  const inputDeposit = useRef();

  return (
    <div className='deposit_form'>
      <form onSubmit={(event) => event.preventDefault()}>
        <InputDeposit
          defaultValue='0.02'
          ref={inputDeposit}
        />
        <ButtonDeposit from={account} input={inputDeposit}/>
      </form>
    </div>
  );
};

export default DepositForm;
