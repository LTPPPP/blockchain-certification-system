const BlockchainService = require('../services/BlockchainService');

class BlockchainController {
    async issueCertificate(req, res) {
        try {
            const certificateData = req.body;
            const accounts = await BlockchainService.getAccounts();
            const result = await BlockchainService.issueCertificate(certificateData, accounts[0]);
            res.json({ success: true, transactionHash: result.transactionHash });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async verifyCertificate(req, res) {
        try {
            const { certificateId } = req.params;
            const result = await BlockchainService.verifyCertificate(certificateId);
            res.json({ valid: result[0], certificate: result[1] });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getStudentCertificates(req, res) {
        try {
            const { studentAddress } = req.params;
            const certificates = await BlockchainService.getStudentCertificates(studentAddress);
            res.json({ success: true, certificates });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async addInstitution(req, res) {
        try {
            const { institutionAddress } = req.body;
            const accounts = await BlockchainService.getAccounts();
            const result = await BlockchainService.addInstitution(institutionAddress, accounts[0]);
            res.json({ success: true, transactionHash: result.transactionHash });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async removeInstitution(req, res) {
        try {
            const { institutionAddress } = req.body;
            const accounts = await BlockchainService.getAccounts();
            const result = await BlockchainService.removeInstitution(institutionAddress, accounts[0]);
            res.json({ success: true, transactionHash: result.transactionHash });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new BlockchainController();