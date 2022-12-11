import React, { useEffect, useState } from 'react';

import '../../styles/topUsersPanel.css';
import config from '../../config.json';


const TopUsersPanel = () => {
  const [users, setUsers] = useState([]);

  const getTopUsers = async () => {
    return fetch(`${config.SERVER_URL}users_by?field=total_prizes&limit=5`,
      { 'method': 'GET' }
    ).then(data => data.json())
  };

  useEffect(() => {
    getTopUsers().then(_users => {
      setUsers(_users);
    })
  }, []);

  return (
    <div className='panel panel__top_users z-depth-5'>
      <div className='panel_text title_top_users'>Top 5 Winenrs:</div>
      {users.map((user) => {
        return (
          <a
            className='panel_text panel__top_users_address'
            target='_blank'
            key={user.address}
            href={config.ETHERSCAN_URL + user.address}
          >{user.address} ({user.total_prizes} ETH)
          </a>
        );
      })
      }
    </div>
  );
};

export default TopUsersPanel;
