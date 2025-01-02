// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "src/Movie.sol";
import "src/User.sol";
import "forge-std/StdJson.sol";
import {Vm} from "forge-std/Vm.sol";
import {console} from "forge-std/console.sol";

contract deploy{
   
    function tryDeploy() public{
        // 部署 Movie
        Movie movie = new Movie();
        console.log("Contract Movie deployed at:", address(movie));

        // // 部署 User
        // User user = new User();
        // console.log("Contract User deployed at:", address(user));
    }
}

