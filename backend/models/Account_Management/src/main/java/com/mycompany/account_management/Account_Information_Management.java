/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.account_management;

/**
 *
 * @author Lam Tan Phat - CE181023
 */
public class Account_Information_Management {

    private String userName;
    private String dateOfBirth;
    private String userGender;
    private String address;

    public Account_Information_Management() {
    }

    public Account_Information_Management(String userName, String dateOfBirth, String userGender, String address) {
        this.userName = userName;
        this.dateOfBirth = dateOfBirth;
        this.userGender = userGender;
        this.address = address;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getUserGender() {
        return userGender;
    }

    public void setUserGender(String userGender) {
        this.userGender = userGender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}
