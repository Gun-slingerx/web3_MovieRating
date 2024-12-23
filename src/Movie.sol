// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Movie is ERC721 {
    uint256 private _nextTokenId = 1;

    struct MovieInfo {
        string name;
        string date;
    }

    // 使用 tokenId 直接映射到 MovieInfo
    mapping(uint256 => MovieInfo) private _movieInfos;

    event MovieMinted(uint256 indexed tokenId, address indexed to, string name, string date);

    constructor() ERC721("MovieNFT", "MNFT") {}

    function mint(address to, string memory name, string memory date) public  {
        uint256 tokenId = _nextTokenId++;
        _movieInfos[tokenId] = MovieInfo(name, date);
        
        _safeMint(to, tokenId);

        emit MovieMinted(tokenId, to, name, date);
    }

    function getMovie(uint256 tokenId) public view returns (string memory, string memory) {
        // require(_exists(tokenId), "Token does not exist");
        MovieInfo storage movie = _movieInfos[tokenId];
        return (movie.name, movie.date);
    }

    function getMovieOwner(uint256 tokenId) public view returns (address) {
        // require(_exists(tokenId), "Token does not exist");
        return ownerOf(tokenId);
    }
}