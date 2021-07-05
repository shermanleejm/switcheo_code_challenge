const UtilityContract = artifacts.require('UtilityContract');

module.exports = function (deployer) {
  deployer.deploy(UtilityContract);
};
