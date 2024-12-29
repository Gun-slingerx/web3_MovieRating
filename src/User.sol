// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "../src/movie.sol";

contract User{

    using EnumerableSet for EnumerableSet.UintSet;

    // 我的电影评分
    mapping(address=>mapping(uint256=>uint8)) userScores ;

    //记录电影评分日期 用户地址=>(日期=>电影Id)
    mapping(address=>mapping(uint256=>uint256)) userScoreCount;
    
    
    //打分 1~5
    function socre(uint256 movieId , uint8 score) public {
        userScores[msg.sender][movieId] = score ;
    }


    //购买nft
    //校验今日评分次数是否大于5次，如果大于5次则报错 单日评价次数不得大于5次；
}