import React, { useState, useEffect } from 'react';

import { contractInstance } from '../../App';


const RoundTime = (props) => {
  const [roundTime, setRoundTime] = useState(0);

  useEffect(() => {
    contractInstance.events.NewRound(
      (error) => _checkAndSetRoundTime(error)
    );
    contractInstance.events.SetNewRoundTime(
      (error) => _checkAndSetRoundTime(error)
    );

    _setRoundTime();
  }, []);

  const _checkAndSetRoundTime = (_error) => {
    if (_error) {
      console.log(_error);
    } else {
      _setRoundTime();
    };
  };

  const _setRoundTime = async () => {
    let _roundTime = await contractInstance.methods.roundTime().call();
    _roundTime = Number(_roundTime);
    setRoundTime(_roundTime);
  };

  return (
    <div {...props}>
      Round Time: {roundTime}
    </div>
  );
};

export default RoundTime;
