// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Mcoin is ERC20{

    // 构造函数将初始化 ERC20 供应量和代币名称
    constructor(uint256 initialSupply) ERC20("MC", "M") {
        // 通过 _mint 函数铸造初始供应量的代币到部署合约的地址
        _mint(msg.sender, initialSupply);
    }

    
}