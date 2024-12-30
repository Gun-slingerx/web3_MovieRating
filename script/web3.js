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
        console.error('Error reading or parsing JSON file:', err);
    }
}

const movieAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
const movieABI = await loadJsonFileABI('out/Movie.sol/Movie.json');

const movieObj = new web3.eth.Contract(movieABI, movieAddress);

async function getTest(){
    return await movieObj.methods.test("this is a test").call().then(console.log);
}


function getTest1(){
    console.log(".........");
}