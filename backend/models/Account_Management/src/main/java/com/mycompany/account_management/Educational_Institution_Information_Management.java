/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.account_management;

/**
 *
 * @author Lam Tan Phat - CE181023
 */
public class Educational_Institution_Information_Management {

    private String educationalInstitutionName;
    private String typeOfInstitution;
    private int taxCodeOfInstitution;
    private String addressOfInstitution;
    private String numberPhoneOfInstitution;
    private String emailOfInstitution;
    private String websiteOfInstitution;
    private String privacyPolicyOfInstitution;
    private boolean isAuthorize;

    public Educational_Institution_Information_Management() {
    }

    public Educational_Institution_Information_Management(String educationalInstitutionName, String typeOfInstitution, int taxCodeOfInstitution, String addressOfInstitution, String numberPhoneOfInstitution, String emailOfInstitution, String websiteOfInstitution, String privacyPolicyOfInstitution, boolean isAuthorize) {
        this.educationalInstitutionName = educationalInstitutionName;
        this.typeOfInstitution = typeOfInstitution;
        this.taxCodeOfInstitution = taxCodeOfInstitution;
        this.addressOfInstitution = addressOfInstitution;
        this.numberPhoneOfInstitution = numberPhoneOfInstitution;
        this.emailOfInstitution = emailOfInstitution;
        this.websiteOfInstitution = websiteOfInstitution;
        this.privacyPolicyOfInstitution = privacyPolicyOfInstitution;
        this.isAuthorize = isAuthorize;
    }

    public String getEducationalInstitutionName() {
        return educationalInstitutionName;
    }

    public void setEducationalInstitutionName(String educationalInstitutionName) {
        this.educationalInstitutionName = educationalInstitutionName;
    }

    public String getTypeOfInstitution() {
        return typeOfInstitution;
    }

    public void setTypeOfInstitution(String typeOfInstitution) {
        this.typeOfInstitution = typeOfInstitution;
    }

    public int getTaxCodeOfInstitution() {
        return taxCodeOfInstitution;
    }

    public void setTaxCodeOfInstitution(int taxCodeOfInstitution) {
        this.taxCodeOfInstitution = taxCodeOfInstitution;
    }

    public String getAddressOfInstitution() {
        return addressOfInstitution;
    }

    public void setAddressOfInstitution(String addressOfInstitution) {
        this.addressOfInstitution = addressOfInstitution;
    }

    public String getNumberPhoneOfInstitution() {
        return numberPhoneOfInstitution;
    }

    public void setNumberPhoneOfInstitution(String numberPhoneOfInstitution) {
        this.numberPhoneOfInstitution = numberPhoneOfInstitution;
    }

    public String getEmailOfInstitution() {
        return emailOfInstitution;
    }

    public void setEmailOfInstitution(String emailOfInstitution) {
        this.emailOfInstitution = emailOfInstitution;
    }

    public String getWebsiteOfInstitution() {
        return websiteOfInstitution;
    }

    public void setWebsiteOfInstitution(String websiteOfInstitution) {
        this.websiteOfInstitution = websiteOfInstitution;
    }

    public String getPrivacyPolicyOfInstitution() {
        return privacyPolicyOfInstitution;
    }

    public void setPrivacyPolicyOfInstitution(String privacyPolicyOfInstitution) {
        this.privacyPolicyOfInstitution = privacyPolicyOfInstitution;
    }

    public boolean isIsAuthorize() {
        return isAuthorize;
    }

    public void setIsAuthorize(boolean isAuthorize) {
        this.isAuthorize = isAuthorize;
    }

}
