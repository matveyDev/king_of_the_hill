import React from 'react';

import ButtonConnect from '../UI/buttons/ButtonConnect';
import ButtonDisconnect from '../UI/buttons/ButtonDisconnect';


const Navbar = () => {
  return (
    <div className='navbar'>
      <nav className="blue lighten-2">
        <div className="nav-wrapper container">
          <a href="/" className="brand-logo">KingOfTheHill</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <ButtonConnect />
            <ButtonDisconnect />
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
