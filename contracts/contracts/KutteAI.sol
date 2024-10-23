// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KutteAi is ERC20 {
    constructor(address receiver) ERC20("KutteAi", "KAI") {
        _mint(receiver, 1000000000000000000000000000000);
    }
}
