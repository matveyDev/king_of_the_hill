import React, { useEffect, useState } from 'react';

import '../../styles/topUsersPanel.css';
import config from '../../config.json';
import { contractInstance, web3 } from '../../App';


const TopUsersPanel = () => {
  const [users, setUsers] = useState([]);

  const getTopUsers = async () => {
    return fetch(`${config.SERVER_URL}users_by?field=total_prizes&limit=5`,
      { method: 'GET' }
    ).then(data => data.json())
  };

  useEffect(() => {
    contractInstance.events.NewWinner(
      async (error, event) => {
        if (error) { console.log(error); };
        addNewUser(event.returnValues._address);
        addPrize(
          event.returnValues._address,
          event.returnValues._prize
        )
        getTopUsers().then(_users => {
          setUsers(_users);
        });
      }
    );

    getTopUsers().then(_users => {
      setUsers(_users);
    });
  }, []);

  const addNewUser = async (address) => {
    return fetch(`${config.SERVER_URL}add_user?address=${address}`,
      { method: 'POST' }
    ).catch(error => console.log(error));
  };

  const addPrize = async (address, prize) => {
    const _prize = web3.utils.fromWei(prize, 'ether');
    return fetch(`${config.SERVER_URL}add_prize?address=${address}&prize=${_prize}`,
      { method: 'PATCH' }
    ).catch(error => console.log(error));
  };

  const renderTopUsers = () => {
    return (
      users.map((user) => {
        const _address = `${user.address.slice(0, 6)}...${user.address.slice(user.address.length - 4)}`;
        const _total_prizes = String(user.total_prizes).slice(0, 6) + ' ETH';
        return (
          <a
            className='panel_text panel__top_users_address'
            target='_blank'
            key={user.address}
            href={config.ETHERSCAN_URL + user.address}
          >{_address} ({_total_prizes})
          </a>
        );
      })
    );
  };

  return (
    <div className='panel panel__top_users z-depth-5'>
      <div className='panel_text title_top_users'>Top 5 Winenrs:</div>
      {renderTopUsers()}
    </div>
  );
};

export default TopUsersPanel;
