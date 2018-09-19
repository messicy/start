pragma solidity ^0.4.23;

contract SupplyChain {
  address public owner;

  constructor() public {
    owner = msg.sender;
  }
}
