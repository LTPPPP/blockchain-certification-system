// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateSystem {
    // Struct to represent a certificate
    struct Certificate {
        string studentName; // Name of the student
        string studentEmail; // Email of the student
        string degreeName; // Name of the degree
        string issuerName; // Name of the institution issuing the certificate
        uint256 issueDate; // Date of issuance
        string certificateId; // Unique ID of the certificate
        string signatureOfInstitution; // Signature of the institution
        string degreeHash; // Hash of the degree
        string degreeUrl; // URL of the degree
    }

    // Struct to represent an educational institution
    struct EducationalInstitution {
        string educationalInstitutionName; // Name of the institution
        string typeOfInstitution; // Type of the institution
        uint256 taxCodeOfInstitution; // Tax code of the institution
        string addressOfInstitution; // Address of the institution
        string numberPhoneOfInstitution; // Phone number of the institution
        string emailOfInstitution; // Email of the institution
        string websiteOfInstitution; // Website of the institution
        string privacyPolicyOfInstitution; // Privacy policy of the institution
        bool isAuthorized; // Flag to indicate if the institution is authorized
    }

    // Address of the contract admin
    address public admin;

    // Mapping of addresses to educational institutions
    mapping(address => EducationalInstitution) public institutions;

    // Mapping of certificate IDs to certificates
    mapping(string => Certificate) private certificates;

    // Mapping of addresses to arrays of certificate IDs
    mapping(address => string[]) private userCertificates;

    // Event emitted when a certificate is issued
    event CertificateIssued(string certificateId, address issuedTo);

    // Event emitted when a certificate is verified
    event CertificateVerified(string certificateId, bool valid);

    // Event emitted when an institution is added
    event InstitutionAdded(address institutionAddress, string name);

    // Event emitted when an institution is removed
    event InstitutionRemoved(address institutionAddress);

    // Constructor function, sets the admin address
    constructor() {
        admin = msg.sender;
    }

    // Modifier to restrict access to only the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    // Modifier to restrict access to only authorized institutions
    modifier onlyInstitution() {
        require(
            institutions[msg.sender].isAuthorized,
            "Only authorized institutions can perform this action."
        );
        _;
    }

    // Function to add an institution
    function addInstitution(
        string memory educationalInstitutionName, // Name of the institution
        string memory typeOfInstitution, // Type of the institution
        uint256 taxCodeOfInstitution, // Tax code of the institution
        string memory addressOfInstitution, // Address of the institution
        string memory numberPhoneOfInstitution, // Phone number of the institution
        string memory emailOfInstitution, // Email of the institution
        string memory websiteOfInstitution, // Website of the institution
        string memory privacyPolicyOfInstitution, // Privacy policy of the institution
        bool isAuthorized // Flag to indicate if the institution is authorized
    ) public onlyAdmin {
        address institutionAddress = msg.sender; // Declare and assign the institutionAddress variable
        institutions[institutionAddress] = EducationalInstitution(
            educationalInstitutionName,
            typeOfInstitution,
            taxCodeOfInstitution,
            addressOfInstitution,
            numberPhoneOfInstitution,
            emailOfInstitution,
            websiteOfInstitution,
            privacyPolicyOfInstitution,
            isAuthorized
        );
        emit InstitutionAdded(institutionAddress, educationalInstitutionName);
    }

    // Function to remove an institution
    function removeInstitution(address institutionAddress) public onlyAdmin {
        delete institutions[institutionAddress];
        emit InstitutionRemoved(institutionAddress);
    }

    // Function to issue a certificate
    function issueCertificate(
        address student,
        string memory studentName,
        string memory studentEmail,
        string memory degreeName,
        string memory issuerName,
        uint256 issueDate,
        string memory certificateId,
        string memory signatureOfInstitution,
        string memory degreeHash,
        string memory degreeUrl
    ) public onlyInstitution {
        require(
            certificates[certificateId].issueDate == 0,
            "Certificate already exists."
        );

        certificates[certificateId] = Certificate(
            studentName,
            studentEmail,
            degreeName,
            issuerName,
            issueDate,
            certificateId,
            signatureOfInstitution,
            degreeHash,
            degreeUrl
        );

        userCertificates[student].push(certificateId);

        emit CertificateIssued(certificateId, student);
    }

    // Function to verify a certificate
    function verifyCertificate(
        string memory certificateId
    ) public view returns (bool, Certificate memory) {
        Certificate memory cert = certificates[certificateId];
        bool valid = cert.issueDate != 0;
        return (valid, cert);
    }

    // Function to verify a certificate and emit an event
    function verifyAndEmit(string memory certificateId) public {
        (bool valid, ) = verifyCertificate(certificateId);
        emit CertificateVerified(certificateId, valid);
    }

    // Function to get the certificates of a user
    function getUserCertificates(
        address user
    ) public view returns (string[] memory) {
        return userCertificates[user];
    }

    // Function to get the information of an institution
    function getInstitutionInfo(
        address institutionAddress
    ) public view returns (string memory, bool) {
        EducationalInstitution memory institution = institutions[
            institutionAddress
        ];
        return (
            institution.educationalInstitutionName,
            institution.isAuthorized
        );
    }
}
