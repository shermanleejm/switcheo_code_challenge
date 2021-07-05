// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UtilityContract {
  uint public walletId = 0;

  struct Wallet {
    string walletAddress;
    uint balance;
  }

  mapping (uint => Wallet) public wallets;

  event WalletAdded (
    uint id,
    string walletAddress,
    uint balance
  );

  constructor() public {
    createWallet("0x123456789", 6969);
  }

  function createWallet(string memory _walletAddress, uint _balance) public {
    wallets[walletId] = Wallet(_walletAddress, _balance);
    emit WalletAdded(walletId, _walletAddress, _balance);
    walletId ++;
  }
}