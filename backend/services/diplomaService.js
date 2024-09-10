const crypto = require('crypto-js');
const ipfsClient = require('ipfs-http-client');
const Diploma = require('../models/Diploma');
const encryptionService = require('./encryptionService');
const blockchainUtils = require('../utils/blockchainUtils');

// Initialize IPFS client
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

/**
 * Encrypt diploma data using AES encryption.
 * @param {Object} diplomaData - The diploma data to encrypt.
 * @param {String} secretKey - The secret key for encryption.
 * @returns {String} Encrypted diploma data.
 */
exports.encryptDiplomaData = (diplomaData, secretKey) => {
    const diplomaString = JSON.stringify(diplomaData);
    const encryptedData = crypto.AES.encrypt(diplomaString, secretKey).toString();
    return encryptedData;
};

/**
 * Decrypt diploma data using AES encryption.
 * @param {String} encryptedData - The encrypted diploma data.
 * @param {String} secretKey - The secret key for decryption.
 * @returns {Object} Decrypted diploma data.
 */
exports.decryptDiplomaData = (encryptedData, secretKey) => {
    const bytes = crypto.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(crypto.enc.Utf8);
    return JSON.parse(decryptedData);
};

/**
 * Store encrypted diploma data on IPFS.
 * @param {String} encryptedData - The encrypted diploma data.
 * @returns {String} IPFS hash of the stored data.
 */
exports.storeDiplomaOnIPFS = async (encryptedData) => {
    try {
        const { cid } = await ipfs.add(encryptedData);
        return cid.toString(); // Return the IPFS hash
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw new Error('Failed to store data on IPFS');
    }
};

/**
 * Retrieve diploma data from IPFS using the IPFS hash.
 * @param {String} ipfsHash - The IPFS hash of the diploma data.
 * @returns {String} The encrypted diploma data retrieved from IPFS.
 */
exports.getDiplomaFromIPFS = async (ipfsHash) => {
    try {
        const stream = ipfs.cat(ipfsHash);
        let data = '';

        for await (const chunk of stream) {
            data += chunk.toString();
        }

        return data;
    } catch (error) {
        console.error('Error retrieving from IPFS:', error);
        throw new Error('Failed to retrieve data from IPFS');
    }
};

exports.issueDiploma = async (diplomaData) => {
    // Mã hóa thông tin bằng cấp
    const encryptedData = encryptionService.encryptData(diplomaData);

    // Ghi dữ liệu lên blockchain
    const diplomaToken = await blockchainUtils.writeToBlockchain(encryptedData);

    // Lưu thông tin trong database
    const diploma = new Diploma({ ...diplomaData, token: diplomaToken });
    await diploma.save();

    return diploma;
};