import React from 'react';

import ButtonConnect from '../UI/buttons/ButtonConnect';
import ButtonDisconnect from '../UI/buttons/ButtonDisconnect';


const Navbar = () => {
  return (
    <div className='navbar'>
      <nav className="blue lighten-2">
        <div className="nav-wrapper container">
          <a href="/" className="brand-logo">KingOfTheHill</a>
          <div id="nav-mobile" className="navbar__buttons right hide-on-med-and-down">
            <div><ButtonConnect /></div>
            <div><ButtonDisconnect /></div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
