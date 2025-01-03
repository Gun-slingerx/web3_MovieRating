// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Movie.sol";
import "forge-std/console.sol"; // 导入 console.log

contract MovieTest is Test { 
    Movie public movieContract;
    address public owner = makeAddr("owner");
    address public user1 = makeAddr("user1");

    function setUp() public {
        // 部署合约
        vm.startPrank(owner);
        movieContract = new Movie();
        vm.stopPrank();
    }

    function testMint() public {
        string[] memory pics = new string[](2);
        pics[0] = "pic1.jpg";
        pics[1] = "pic2.jpg";

        // 调用 mint 方法
        vm.prank(owner); // 使用 owner 地址作为调用者
        movieContract.mint(user1, "Test Movie", "2024-01-01", pics);

        // 检查电影信息是否正确存储
        (string memory name, string memory date, string[] memory returnedPics) = movieContract.getMovie(1);
        assertEq(name, "Test Movie", "Movie name should be 'Test Movie'");
        assertEq(date, "2024-01-01", "Movie date should be '2024-01-01'");
        assertEq(returnedPics.length, 2, "Returned pictures array length should be 2");
        assertEq(returnedPics[0], "pic1.jpg", "First picture should be 'pic1.jpg'");
        assertEq(returnedPics[1], "pic2.jpg", "Second picture should be 'pic2.jpg'");

        // 检查 TokenId 是否存在
        assertTrue(movieContract.checkMovieIdExist(1), "Token ID 1 should exist");
    }

    function testGetAllKeys() public {
        // 先添加一些键值
        string[] memory pics = new string[](1);
        pics[0] = "pic.jpg";

        vm.prank(owner); // 使用 owner 地址作为调用者
        movieContract.mint(user1, "Movie 1", "2024-01-01", pics);
        movieContract.mint(user1, "Movie 2", "2024-01-02", pics);
        movieContract.mint(user1, "Movie 3", "2024-01-03", pics);

        // 获取所有的键值并检查
        uint256[] memory keys = movieContract.getAllKeys();
        assertEq(keys.length, 3, "There should be 3 keys in the set");
        console.log("keys length is");
        console.log(keys.length);

        // 检查每个键值是否符合预期
        for (uint256 i = 0; i < keys.length; i++) {
            console.log(keys[i]);
            assertTrue(movieContract.checkMovieIdExist(keys[i]), "Key should exist in the set");
        }
    }
}