// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Movie is ERC721, Ownable {
    using EnumerableSet for EnumerableSet.UintSet;

    uint256 private _nextTokenId = 1;

    struct MovieInfo {
        string name;
        string date;
        string[] pics;
    }

    // 使用 tokenId 直接映射到 MovieInfo
    mapping(uint256 => MovieInfo) private _movieInfos;

    // 使用 EnumerableSet 来存储所有键
    EnumerableSet.UintSet private _keys;

    event MovieMinted(
        uint256 indexed tokenId,
        address indexed to,
        string name,
        string date
    );

    constructor() ERC721("MovieNFT", "MNFT") Ownable(msg.sender){}

    //新增电影信息
    function mint(
        address to,
        string memory name,
        string memory date,
        string[] memory pics
    ) public {
        uint256 tokenId = _nextTokenId;
        _movieInfos[tokenId] = MovieInfo(name, date, pics);
     
        _safeMint(to, tokenId);
        _keys.add(tokenId);
        _nextTokenId++;
        emit MovieMinted(tokenId, to, name, date);
    }

    function getMovie(
        uint256 tokenId
    ) public view returns (string memory, string memory, string[] memory) {
        require(_keys.contains(tokenId), "Token does not exist");
        MovieInfo storage movie = _movieInfos[tokenId];
        return (movie.name, movie.date, movie.pics);
    }

    function getMovieOwner(uint256 tokenId) public view returns (address) {
        // require(_exists(tokenId), "Token does not exist");
        return ownerOf(tokenId);
    }

    //burn
    function burnMovieNFT (uint256 tokenId) public{
        require(ownerOf(tokenId) == msg.sender, "Caller is not owner nor approved");

        _keys.remove(tokenId);
        delete _movieInfos[tokenId];
        _burn(tokenId);
    }

    function test(string memory str) public pure returns(string memory){
        return str;
    }

    function checkMovieIdExist(uint256 tokenId) public view returns(bool){
        return _keys.contains(tokenId);
    }

    // 获取_keys中的所有值
    function getAllKeys() public view returns (uint256[] memory) {
        uint256[] memory keysArray = new uint256[](_keys.length());
        for (uint256 i = 0; i < _keys.length(); i++) {
            keysArray[i] = _keys.at(i);
        }
        return keysArray;
    }

    // 获取_keys中的所有值
    function getNextTokenId() public view returns (uint256) {
        return _nextTokenId;
    }
}
