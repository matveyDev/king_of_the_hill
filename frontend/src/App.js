import React from "react";
import Web3 from 'web3';

import config from './config.json';
import HomePage from "./pages/Home";
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './styles/App.css';
import Navbar from './components/static/Navbar';


export const web3 = new Web3(Web3.givenProvider);
export const contractInstance = new web3.eth.Contract(
  config.ABI, config.CONTRACT_ADDRESS
);
export const wsClient = new W3CWebSocket(config.WEBSOCKET_URL);


const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <HomePage/>
    </div>
  );
}

export default App;
