import React from 'react';

import { contractInstance } from '../../../App';


const ButtonRefreshRound = ({from}) => {

  const refreshRound = async () => {
    await contractInstance.methods.checkRound().send({from: from});
  };

  return (
      <button onClick={refreshRound} className='btn btn__check_round blue lighten-3 waves-effect'>
        Refresh Round
      </button>
  )
};

export default ButtonRefreshRound;
