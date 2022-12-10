import React, { useState } from 'react';

import ButtonConnect from '../UI/buttons/ButtonConnect';
import ButtonDisconnect from '../UI/buttons/ButtonDisconnect';

const Navbar = () => {
  return (
    <div style={{marginBottom: '15px'}}>
      <nav class="blue lighten-2">
        <div class="nav-wrapper container">
          <a href="/" class="brand-logo">KingOfTheHill</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <ButtonConnect/>
            <ButtonDisconnect/>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
