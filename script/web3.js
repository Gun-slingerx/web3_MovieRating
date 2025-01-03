import 'dotenv/config';
import { Web3 } from 'web3';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

// private RPC endpoint
const web3 = new Web3('ws://localhost:8545');

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

const ownAddress = process.env.OWNADDRESS;

async function mintMovie() {
    const name = "蝙蝠侠2";
    const date = "2001-01-01";
    const pic = ["pic_a", "pic_b", "pic_c"];
    
    try {
        const receipt = await movieObj.methods.mint(ownAddress, name, date, pic).send({
            from: ownAddress,
            gas: 3000000
        });
        console.log("Transaction receipt:", receipt);
        return receipt;
    } catch (error) {
        console.error("Error sending mint transaction:", error.message);
        throw error;
    }
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

async function test02() {
    console.log("获取长度........");
    return await movieObj.methods.getNextTokenId().call();
}

async function checkBlockNumber() {
    const blockNumber = await web3.eth.getBlockNumber();
    console.log("Latest block number:", blockNumber);
}

// web3.eth.getBlockNumber().then(console.log);

// getTest().then(console.log);


// test01(tokenIdToCheck).then(console.log);
// test02().then(console.log);
// const tokenIdToCheck = 1;
// getMovieInfo(tokenIdToCheck)
//     .then(info => {
//         console.log("Retrieved movie information:", info);
//     })
//     .catch(err => {
//         console.error("Failed to retrieve movie information:", err);
//     });


// 执行 mintMovie 并检查区块号
mintMovie()
    .then(() => checkBlockNumber())
    .catch(err => console.error("Failed to mint movie or check block number:", err));


// test02().then(console.log);

// get past `Transfer` events from block 18850576
// const eventTransfer = await uniswapToken.getPastEvents('Transfer', { fromBlock: 18850576 });
// const eventMovieMint = await movieObj.getPastEvents('MovieMinted',{fromBlock:0});

// console.log(eventMovieMint);
// ↳ [{...},{...}, ...] array with all the events emitted