import axios from 'axios'; // Import thư viện axios để thực hiện các yêu cầu HTTP

const API_URL = 'http://localhost:8080/api'; // Địa chỉ URL của API

// Hàm lấy tất cả các tài khoản
export const getAllAccounts = async () => {
    try {
        const response = await axios.get(`${API_URL}/accounts`); // Gửi yêu cầu GET đến API để lấy danh sách tài khoản
        return response.data; // Trả về dữ liệu nhận được từ API
    } catch (error) {
        console.error('Error fetching accounts', error); // In ra lỗi nếu có
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};

// Hàm tạo tài khoản mới
export const createAccount = async (account) => {
    try {
        const response = await axios.post(`${API_URL}/accounts`, account); // Gửi yêu cầu POST đến API để tạo tài khoản mới
        return response.data; // Trả về dữ liệu nhận được từ API
    } catch (error) {
        console.error('Error creating account', error); // In ra lỗi nếu có
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};
