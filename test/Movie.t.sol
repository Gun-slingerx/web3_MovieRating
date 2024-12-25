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
        string[] memory picArray = new string[](2);
        picArray[0] = "xxxxx0000000001";
        picArray[1] = "xxxxx0000000002";

        nft.mint(
            msg.sender,
            unicode"蜘蛛侠1",
            unicode"2000-01-01",         
            picArray
        );

        (string memory name, string memory date, string[] memory pics) = nft
            .getMovie(1);
        console.log("------------------++++++");
        console.log("Movie Name:", name);
        console.log("Release Date:", date);
        for (uint256 i = 0; i < pics.length; i++) {
            console.log(pics[i]);
        }
    }

    // function testConsole() public pure {
    //     console.log("----sdsadasd-----++++++");
    //     console.log("------------------++++++");
    // }
}
