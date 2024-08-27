/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.account_management;

import java.util.Date;

/**
 *
 * @author Lam Tan Phat - CE181023
 */
public class Certificate_Management {

    private String degreeName;
    private String issuerName;
    private Date issueDate;
    private String certificateId;
    private String signatureOfInstitution;
    private String degreeHash;
    private String degreeUrl;

    public Certificate_Management() {
    }

    public Certificate_Management(String degreeName, String issuerName, Date issueDate, String certificateId, String signatureOfInstitution, String degreeHash, String degreeUrl) {
        this.degreeName = degreeName;
        this.issuerName = issuerName;
        this.issueDate = issueDate;
        this.certificateId = certificateId;
        this.signatureOfInstitution = signatureOfInstitution;
        this.degreeHash = degreeHash;
        this.degreeUrl = degreeUrl;
    }

    public String getDegreeName() {
        return degreeName;
    }

    public void setDegreeName(String degreeName) {
        this.degreeName = degreeName;
    }

    public String getIssuerName() {
        return issuerName;
    }

    public void setIssuerName(String issuerName) {
        this.issuerName = issuerName;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public String getCertificateId() {
        return certificateId;
    }

    public void setCertificateId(String certificateId) {
        this.certificateId = certificateId;
    }

    public String getSignatureOfInstitution() {
        return signatureOfInstitution;
    }

    public void setSignatureOfInstitution(String signatureOfInstitution) {
        this.signatureOfInstitution = signatureOfInstitution;
    }

    public String getDegreeHash() {
        return degreeHash;
    }

    public void setDegreeHash(String degreeHash) {
        this.degreeHash = degreeHash;
    }

    public String getDegreeUrl() {
        return degreeUrl;
    }

    public void setDegreeUrl(String degreeUrl) {
        this.degreeUrl = degreeUrl;
    }

}
