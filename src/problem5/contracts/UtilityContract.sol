// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract UtilityContract {
  struct Token {
    string token;
    uint balance;
  }

  mapping (string => Token[]) public wallet;

  event NewToken(string walletOwner, string token, uint balance);

  function addToken (string memory _walletOwner, string memory _token, uint _balance) public {
    Token memory tmp = Token(_token, _balance);
    wallet[_walletOwner].push(tmp);
    emit NewToken(_walletOwner, _token, _balance);
  }

  function getBalance(string memory _walletOwner) public view returns(Token[] memory) {  
    Token[] memory t = wallet[_walletOwner];
    return t;
  }
}