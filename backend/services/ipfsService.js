//backend/services/ipfsService.js
// Đây là file service chứa các hàm liên quan đến việc tương tác với IPFS, bao gồm mã hóa dữ liệu trước khi upload và giải mã dữ liệu sau khi lấy về từ IPFS.
const { create } = require('ipfs-http-client');
const crypto = require('crypto');
const AES = require('crypto-js/aes'); // Sử dụng thư viện mã hóa AES
const encUtf8 = require('crypto-js/enc-utf8');

// Kết nối với IPFS node, có thể dùng một public IPFS node hoặc tự host node của mình
const ipfs = create({
    host: 'ipfs.infura.io', // Ví dụ với Infura
    port: 5001,
    protocol: 'https'
});

// Tạo hàm băm SHA-256 từ dữ liệu
const createHash = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

// Mã hóa dữ liệu sử dụng AES
const encryptData = (data, encryptionKey) => {
    const iv = crypto.randomBytes(12); // Create random IV (12 bytes for AES-GCM)
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(encryptionKey, 'hex'), iv);

    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex'); // Get the authentication tag for AES-GCM
    return iv.toString('hex') + ':' + authTag + ':' + encryptedData; // Return IV, authTag, and encrypted data
};

// Giải mã dữ liệu sử dụng AES
const decryptData = (encryptedData, encryptionKey) => {
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encryptedText = parts[2];

    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(encryptionKey, 'hex'), iv);
    decipher.setAuthTag(authTag); // Set the auth tag to ensure data integrity

    let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    return decryptedData;
};

// Assuming you have a smart contract method 'storeHash'
const storeHashOnBlockchain = async (hash) => {
    try {
        // Integrate with your smart contract here
        const tx = await blockchainContract.storeHash(hash, { from: senderAddress });
        await tx.wait(); // Wait for the transaction to be confirmed
        return tx.transactionHash;
    } catch (error) {
        console.error("Error storing hash on blockchain:", error);
        throw new Error("Failed to store hash on the blockchain");
    }
};

// Get all accounts with retries and better error handling
export const getAllAccounts = async () => {
    try {
        const response = await axios.get(`${API_URL}/accounts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching accounts:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch accounts');
    }
};

// Create a new account with proper error reporting
export const createAccount = async (account) => {
    try {
        const response = await axios.post(`${API_URL}/accounts`, account);
        return response.data;
    } catch (error) {
        console.error('Error creating account:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create account');
    }
};

/**
 * Upload encrypted data to IPFS and save the hash (CID) on Blockchain
 * @param {Buffer|string} data - Dữ liệu cần upload, có thể là Buffer hoặc string
 * @param {string} encryptionKey - Khóa mã hóa sử dụng cho AES
 * @returns {Promise<string>} - Trả về hash (CID) của file trên IPFS và hash SHA-256 lưu trên blockchain
 */
const uploadToIPFS = async (data, encryptionKey) => {
    try {
        // Mã hóa dữ liệu
        const encryptedData = encryptData(data, encryptionKey);

        // Lưu trữ dữ liệu mã hóa lên IPFS
        const { cid } = await ipfs.add(encryptedData);

        // Tạo hàm băm SHA-256 từ dữ liệu mã hóa để lưu trên blockchain
        const hash = createHash(encryptedData);

        // Lưu hash lên blockchain (cần tích hợp smart contract ở đây)
        // Ví dụ: await blockchainContract.storeHash(hash);

        return { cid: cid.toString(), hash }; // Trả về CID và hash để lưu trên blockchain
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
        throw new Error("Failed to upload to IPFS");
    }
};

/**
 * Get and decrypt file from IPFS
 * @param {string} cid - CID của file cần lấy từ IPFS
 * @param {string} encryptionKey - Khóa mã hóa sử dụng cho AES
 * @returns {Promise<string>} - Trả về nội dung của file đã giải mã
 */
const getFileFromIPFS = async (cid, encryptionKey) => {
    try {
        const stream = ipfs.cat(cid);
        let encryptedData = '';

        for await (const chunk of stream) {
            encryptedData += chunk.toString(); // Concatenate all chunks into a single string
        }

        // Ensure data isn't empty or undefined
        if (!encryptedData) {
            throw new Error('No data retrieved from IPFS');
        }

        // Decrypt the data with AES-GCM
        const decryptedData = decryptData(encryptedData, encryptionKey);

        return decryptedData; // Return decrypted content
    } catch (error) {
        console.error("Error retrieving file from IPFS:", error);
        throw new Error("Failed to retrieve or decrypt file from IPFS");
    }
};


module.exports = {
    uploadToIPFS,
    getFileFromIPFS
};
