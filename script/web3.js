import 'dotenv/config';
import { Web3 } from 'web3';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

// private RPC endpoint
const web3 = new Web3('ws://localhost:8545');

web3.eth.getBlockNumber().then(console.log);
// ↳ 18849658n

async function loadJsonFileABI(filePath) {
    try {
        // 构建文件路径
        const absolutePath = resolve(filePath);
        // 读取文件内容
        const rawdata = await readFile(absolutePath, 'utf8');
        // 解析 JSON 数据
        const data = JSON.parse(rawdata);
        const abi = data.abi;
        if (!Array.isArray(abi)) {
            throw new Error('The parsed JSON does not contain a valid ABI array.');
        }
        return abi;
    } catch (err) {
        console.error('Error reading or parsing JSON file:');
    }
}

const movieAddress = process.env.MOVIE_ADDRESS;
const movieABI = await loadJsonFileABI('out/Movie.sol/Movie.json');

const movieObj = new web3.eth.Contract(movieABI, movieAddress);

async function getTest(){
    return await movieObj.methods.test("this is a test").call();
}

const ownAddress = process.env.OWNADDRESS;

async function mintMovie(){
    const name = "蝙蝠侠1";
    const date = "2001-01-01";
    const pic = ["pic_a","pic_b","pic_c"];
    return await movieObj.methods.mint(ownAddress,name,date,pic).call();
}

async function getMovieInfo(tokenId) {
    try {
        const result = await movieObj.methods.getMovie(tokenId).call();
        console.log("Movie Name:", result[0]);
        console.log("Movie Date:", result[1]);
        console.log("Movie Pics:", result[2]);
        return result;
    } catch (error) {
        console.error("Error calling getMovie:", error.message);
        throw error;
    }
}

async function test01(params) {
    return await movieObj.methods.checkMovieIdExist(params).call();
}

// getTest().then(console.log);
// mintMovie().then(console.log);
// getMovieInfo(1)
//     .then(info => {
//         console.log("Retrieved movie information:", info);
//     })
//     .catch(err => {
//         console.error("Failed to retrieve movie information:", err);
//     });

const name = "蝙蝠侠1";
const date = "2001-01-01";
const pic = ["pic_a","pic_b","pic_c"];
movieObj.methods.mint(ownAddress,name,date,pic).call();


