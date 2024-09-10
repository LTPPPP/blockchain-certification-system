// utils/blockchainUtils.js
const Web3 = require('web3');
const contractABI = require('../blockchain/contractABI.json');
const contractAddress = process.env.CONTRACT_ADDRESS;

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_NODE));

const contract = new web3.eth.Contract(contractABI, contractAddress);

exports.writeToBlockchain = async (data) => {
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods.issueDiploma(data).send({ from: accounts[0] });
    return result.transactionHash;
};
