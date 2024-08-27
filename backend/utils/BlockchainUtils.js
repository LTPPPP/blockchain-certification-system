const crypto = require('crypto');
const Web3 = require('web3');

class BlockchainUtils {
    static hashData(data) {
        return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
    }

    static signData(data, privateKey) {
        const web3 = new Web3();
        const dataHash = this.hashData(data);
        const signature = web3.eth.accounts.sign(dataHash, privateKey);
        return signature.signature;
    }

    static verifySignature(data, signature, publicAddress) {
        const web3 = new Web3();
        const dataHash = this.hashData(data);
        const recoveredAddress = web3.eth.accounts.recover(dataHash, signature);
        return recoveredAddress.toLowerCase() === publicAddress.toLowerCase();
    }

    static generateCertificateId(studentAddress, degreeName, issueDate) {
        const data = `${studentAddress}-${degreeName}-${issueDate}`;
        return this.hashData(data);
    }
}

module.exports = BlockchainUtils;