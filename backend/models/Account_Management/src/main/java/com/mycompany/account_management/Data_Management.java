package com.mycompany.account_management;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.regex.Pattern;

public class Data_Management {

    public boolean validateAccountInformation(Account_Information_Management info) {
        if (info.getUserName() == null || info.getUserName().trim().isEmpty()) {
            System.out.println("Error: Username cannot be empty.");
            return false;
        }

        if (info.getDateOfBirth() == null || !isValidDate(info.getDateOfBirth())) {
            System.out.println("Error: Invalid date of birth. Use format DD/MM/YYYY.");
            return false;
        }

        if (info.getUserGender() == null || (!info.getUserGender().equalsIgnoreCase("male") && 
            !info.getUserGender().equalsIgnoreCase("female") && !info.getUserGender().equalsIgnoreCase("other"))) {
            System.out.println("Error: Gender must be 'male', 'female', or 'other'.");
            return false;
        }

        if (info.getAddress() == null || info.getAddress().trim().isEmpty()) {
            System.out.println("Error: Address cannot be empty.");
            return false;
        }

        return true;
    }

    public boolean validateCertificate(Certificate_Management cert) {
        if (cert.getDegreeName() == null || cert.getDegreeName().trim().isEmpty()) {
            System.out.println("Error: Degree name cannot be empty.");
            return false;
        }

        if (cert.getIssuerName() == null || cert.getIssuerName().trim().isEmpty()) {
            System.out.println("Error: Issuer name cannot be empty.");
            return false;
        }

        if (cert.getIssueDate() == null || cert.getIssueDate().after(new Date())) {
            System.out.println("Error: Invalid issue date.");
            return false;
        }

        if (cert.getCertificateId() == null || cert.getCertificateId().trim().isEmpty()) {
            System.out.println("Error: Certificate ID cannot be empty.");
            return false;
        }

        if (cert.getSignatureOfInstitution() == null || cert.getSignatureOfInstitution().trim().isEmpty()) {
            System.out.println("Error: Signature of institution cannot be empty.");
            return false;
        }

        if (cert.getDegreeHash() == null || !isValidHash(cert.getDegreeHash())) {
            System.out.println("Error: Invalid degree hash.");
            return false;
        }

        if (cert.getDegreeUrl() == null || !isValidUrl(cert.getDegreeUrl())) {
            System.out.println("Error: Invalid degree URL.");
            return false;
        }

        return true;
    }

    public boolean validateAccountManagement(Account_Management account) {
        if (account.getUserAccount() == null || account.getUserAccount().trim().isEmpty()) {
            System.out.println("Error: User account cannot be empty.");
            return false;
        }

        if (account.getPassword() == null || account.getPassword().length() < 8) {
            System.out.println("Error: Password must be at least 8 characters long.");
            return false;
        }

        return true;
    }

    private boolean isValidDate(String date) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        sdf.setLenient(false);
        try {
            sdf.parse(date);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }

    private boolean isValidHash(String hash) {
        // This is a simple check. You might want to implement a more robust validation.
        return hash.matches("^[a-fA-F0-9]{64}$");
    }

    private boolean isValidUrl(String url) {
        String urlRegex = "^(https?://)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([/\\w \\.-]*)*/?$";
        return Pattern.compile(urlRegex).matcher(url).matches();
    }
}