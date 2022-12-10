// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


contract KingOfTheHill is Ownable {
    mapping (address => uint) public winnerToPrize;

    address public highestCallerAddress;
    uint public highestDeposit;
    uint public timeStampLastDeposit = block.timestamp;
    uint public roundTime = 120 seconds;
    uint public prizePool;
    uint public comissionRateToWithdraw = 0.001 ether;

    event NewDeposit(address from, uint value);
    event NewRound(uint roundTime);
    event NewWinner(address _address, uint _prize);
    event WithdrawPrize(address _address, uint _prize);
    event SetNewRoundTime (uint roundTime);
    event NewComissionRateToWithdraw(uint comissionRateToWithdraw);

    function deposit() external payable {
        require(block.timestamp - timeStampLastDeposit < roundTime, "It's time to refresh");
        require(highestCallerAddress != msg.sender, 'You are the highest');
        require(msg.value > highestDeposit, 'Deposit must be greater than highest deposit');
        timeStampLastDeposit = block.timestamp;
        highestCallerAddress = msg.sender;
        highestDeposit = msg.value;
        prizePool += msg.value;

        emit NewDeposit(msg.sender, msg.value);
    }

    function checkRound() public {
        require(block.timestamp - timeStampLastDeposit >= roundTime, "Don't need to refresh");
        refreshRound();
    }

    function refreshRound() private {
        emit NewWinner(highestCallerAddress, prizePool);

        winnerToPrize[highestCallerAddress] += prizePool;
        prizePool = 0;
        timeStampLastDeposit = block.timestamp;
        highestDeposit = 0;
        highestCallerAddress = address(this);

        emit NewRound(roundTime);
    }

    function withdrawPrize() payable external {
        require(winnerToPrize[msg.sender] > 0);
        require(msg.value == comissionRateToWithdraw);

        payable(msg.sender).transfer(winnerToPrize[msg.sender]);
        emit WithdrawPrize(msg.sender, winnerToPrize[msg.sender]);
        delete winnerToPrize[msg.sender];
    }

    function setRoundTime(uint _roundTime) public onlyOwner {
        require(roundTime != _roundTime);
        roundTime = _roundTime;

        emit SetNewRoundTime(roundTime);
    }

    function setComissionRateToWithdraw(uint _comissionRateToWithdraw) public onlyOwner {
        require(comissionRateToWithdraw != _comissionRateToWithdraw);
        comissionRateToWithdraw = _comissionRateToWithdraw;

        emit NewComissionRateToWithdraw(comissionRateToWithdraw);
    }
}
