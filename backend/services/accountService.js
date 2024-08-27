import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getAllAccounts = async () => {
    try {
        const response = await axios.get(`${API_URL}/accounts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching accounts', error);
        throw error;
    }
};

export const createAccount = async (account) => {
    try {
        const response = await axios.post(`${API_URL}/accounts`, account);
        return response.data;
    } catch (error) {
        console.error('Error creating account', error);
        throw error;
    }
};
