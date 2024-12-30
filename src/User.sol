// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract User {
    using EnumerableSet for EnumerableSet.UintSet;

    // 我的电影评分
    mapping(address => mapping(uint256 => uint8)) public userScores;

    //记录电影评分日期 用户地址=>(日期=>电影Id)
    mapping(address => mapping(uint256 => uint256)) public userScoreCount;

    //记录用户评价过的电影id
    mapping(address => EnumerableSet.UintSet) userMovieList;

    //打分 1~5
    function doScore(uint256 movieId, uint8 rating) public check{
        require(rating >= 1 && rating <= 5, "Score must be between 1 and 5");

        userScores[msg.sender][movieId] = rating;
        userMovieList[msg.sender].add(movieId);

        emit Scored(msg.sender, movieId, rating);
    }

    event Scored(address indexed user, uint256 movieId, uint8 rating);

    modifier check() {
        uint256 today = block.timestamp / 1 days; // 获取今天的日期（简化为天） 时间判断待优化
        require(
            userScoreCount[msg.sender][today] < 5,
            "Daily score limit exceeded"
        );
        _;
        userScoreCount[msg.sender][today]++;
    }
    
}
