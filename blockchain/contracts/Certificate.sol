// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateSystem {
    struct Certificate {
        string studentName; // Name of the student
        string degreeName; // Name of the degree
        string issuerName; // Name of the institution issuing the certificate
        uint256 issueDate; // Date when the certificate was issued
        string certificateId; // Unique identifier for the certificate
        string signature; // Signature of the certificate
        string degreeHash; // Hash of the degree
        string degreeUrl; // URL of the degree
    }

    address public admin; // Address of the admin
    mapping(address => bool) public institutions; // Mapping of authorized institutions
    mapping(string => Certificate) private certificates; // Mapping of certificateId to Certificate struct
    mapping(address => string[]) private studentCertificates; // Mapping of student address to list of certificateIds

    event CertificateIssued(string certificateId, address issuedTo); // Event emitted when a certificate is issued
    event CertificateVerified(string certificateId, bool valid); // Event emitted when a certificate is verified

    constructor() {
        admin = msg.sender; // Set the admin address to the contract deployer
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action."); // Modifier to restrict access to only the admin
        _;
    }

    modifier onlyInstitution() {
        require(
            institutions[msg.sender],
            "Only authorized institutions can perform this action."
        ); // Modifier to restrict access to only authorized institutions
        _;
    }

    function addInstitution(address institution) public onlyAdmin {
        institutions[institution] = true; // Add an institution to the authorized list
    }

    function removeInstitution(address institution) public onlyAdmin {
        institutions[institution] = false; // Remove an institution from the authorized list
    }

    function issueCertificate(
        address student,
        string memory studentName,
        string memory degreeName,
        string memory issuerName,
        uint256 issueDate,
        string memory certificateId,
        string memory signature,
        string memory degreeHash,
        string memory degreeUrl
    ) public onlyInstitution {
        require(
            certificates[certificateId].issueDate == 0,
            "Certificate already exists."
        ); // Check if the certificate with the given certificateId already exists

        certificates[certificateId] = Certificate(
            studentName,
            degreeName,
            issuerName,
            issueDate,
            certificateId,
            signature,
            degreeHash,
            degreeUrl
        ); // Create a new certificate and store it in the certificates mapping

        studentCertificates[student].push(certificateId); // Add the certificateId to the list of certificates for the student

        emit CertificateIssued(certificateId, student); // Emit an event to indicate that a certificate has been issued
    }

    function verifyCertificate(
        string memory certificateId
    ) public view returns (bool, Certificate memory) {
        Certificate memory cert = certificates[certificateId]; // Retrieve the certificate with the given certificateId
        bool valid = cert.issueDate != 0; // Check if the certificate is valid (issueDate is not zero)
        return (valid, cert); // Return the validity status and the certificate
    }

    function verifyAndEmit(string memory certificateId) public {
        (bool valid, ) = verifyCertificate(certificateId); // Verify the certificate and get the validity status
        emit CertificateVerified(certificateId, valid); // Emit an event to indicate the verification result
    }

    function getStudentCertificates(
        address student
    ) public view returns (string[] memory) {
        return studentCertificates[student]; // Get the list of certificateIds for the given student
    }
}
