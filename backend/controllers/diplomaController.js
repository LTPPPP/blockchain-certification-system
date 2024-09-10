const Diploma = require('../models/Diploma');
const diplomaService = require('../services/diplomaService');

// Secret key for encryption (you can store this in a more secure way, like an environment variable)
const SECRET_KEY = process.env.ENCRYPTION_SECRET;

/**
 * Issue a diploma, encrypt the data, and store it on IPFS.
 */
exports.issueDiploma = async (req, res) => {
    const { studentId, title, institution, issueDate, diplomaId } = req.body;

    try {
        // Create diploma object
        const diplomaData = { studentId, title, institution, issueDate, diplomaId };

        // Encrypt diploma data
        const encryptedData = diplomaService.encryptDiplomaData(diplomaData, SECRET_KEY);

        // Store encrypted data on IPFS
        const ipfsHash = await diplomaService.storeDiplomaOnIPFS(encryptedData);

        // Save diploma record to the database
        const diploma = new Diploma({
            student: studentId,
            title,
            institution,
            issueDate,
            diplomaId,
            token: ipfsHash // Store IPFS hash as the token
        });

        await diploma.save();
        res.status(201).json({ message: 'Diploma issued successfully', ipfsHash });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error issuing diploma' });
    }
};

/**
 * Verify a diploma by fetching it from IPFS and decrypting the data.
 */
exports.verifyDiploma = async (req, res) => {
    const { diplomaId } = req.params;

    try {
        // Fetch diploma from the database
        const diploma = await Diploma.findOne({ diplomaId });
        if (!diploma) return res.status(404).json({ error: 'Diploma not found' });

        // Retrieve the encrypted data from IPFS
        const encryptedData = await diplomaService.getDiplomaFromIPFS(diploma.token);

        // Decrypt diploma data
        const decryptedData = diplomaService.decryptDiplomaData(encryptedData, SECRET_KEY);

        res.status(200).json(decryptedData);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error verifying diploma' });
    }
};
