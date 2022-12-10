const KingOfTheHill = artifacts.require("../contracts/KingOfTheHill.sol");

module.exports = function(deployer) {
  deployer.deploy(KingOfTheHill);
};
