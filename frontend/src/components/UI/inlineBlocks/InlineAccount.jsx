import React from 'react';


const InlineAccount = ({props, text}) => {
  return (
    <div {...props}>
      {text}
    </div>
  );
};

export default InlineAccount;
