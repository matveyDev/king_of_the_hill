import React from 'react';


const InputDeposit = React.forwardRef((props, ref) => {
  return (
      <input
        className='input input__deposit'
        placeholder='0.02'
        type="text"
        {...props}
        ref={ref}
      />
  );
});

export default InputDeposit;
