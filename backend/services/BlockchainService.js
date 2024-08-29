// backend/services/BlockchainService.js

const Web3 = require('web3');
const contractABI = require('../config/contractABI.json');
const config = require('../config/blockchain');

/**
 * Represents a service for interacting with the blockchain.
 * @class
 */
class BlockchainService {
    constructor() {
        this.web3 = new Web3(config.providerUrl);
        this.contract = new this.web3.eth.Contract(contractABI, config.contractAddress);
    }

    async getAccounts() {
        return await this.web3.eth.getAccounts();
    }

    async issueCertificate(certificateData, fromAddress) {
        const {
            student,
            studentName,
            studentEmail,
            degreeName,
            issuerName,
            issueDate,
            certificateId,
            signatureOfInstitution,
            degreeHash,
            degreeUrl
        } = certificateData;

        return await this.contract.methods.issueCertificate(
            student,
            studentName,
            studentEmail,
            degreeName,
            issuerName,
            issueDate,
            certificateId,
            signatureOfInstitution,
            degreeHash,
            degreeUrl
        ).send({ from: fromAddress, gas: 1000000 });
    }

    async verifyCertificate(certificateId) {
        return await this.contract.methods.verifyCertificate(certificateId).call();
    }

    async getStudentCertificates(studentAddress) {
        return await this.contract.methods.getStudentCertificates(studentAddress).call();
    }

    async addInstitution(institutionAddress, fromAddress) {
        return await this.contract.methods.addInstitution(institutionAddress).send({ from: fromAddress, gas: 100000 });
    }

    async removeInstitution(institutionAddress, fromAddress) {
        return await this.contract.methods.removeInstitution(institutionAddress).send({ from: fromAddress, gas: 100000 });
    }
}

module.exports = new BlockchainService();