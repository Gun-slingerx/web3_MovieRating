// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;
import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/Movie.sol";

contract MovieTest is Test {
    Movie private nft;

    function setUp() public {
        nft = new Movie();
    }

    function testMintNFT() public {
        nft.mint(msg.sender, unicode"蜘蛛侠1", unicode"2000-01-01");

        (string memory name, string memory date) = nft.getMovie(1);
        console.log("------------------++++++");
        console.log("Movie Name:", name);
        console.log("Release Date:", date);
    }

    function testConsole() public pure {
        console.log("----sdsadasd-----++++++");
        console.log("------------------++++++");
    }
}
