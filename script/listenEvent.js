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

const movieAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const movieABI = await loadJsonFileABI('out/Movie.sol/Movie.json');

const contract = new web3.eth.Contract(movieABI, movieAddress);

async function listenMintEvent() {
    contract.event.MovieMinted({
        fromBlock: 'latest' // 从最新的区块开始监听
    })
    .on('data', (event) => {
        console.log("MovieAdded event detected:");
        console.log("Token ID:", event.returnValues.tokenId);
        console.log("to:", event.returnValues.to);
        console.log("name:", event.returnValues.name);
        console.log("date:", event.returnValues.date);
    })
    .on('error', console.error); // 错误处理
}

listenMintEvent();
