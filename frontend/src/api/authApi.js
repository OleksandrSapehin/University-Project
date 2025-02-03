import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

// Экземпляр axios для общих настроек
const authApi = axios.create({
    baseURL: 'http://localhost:8080',
});

// Интерсептор для добавления токена в заголовок каждого запроса
authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const registerUser = async (userData) => {
    try {
        const response = await authApi.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await authApi.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/refresh', { refreshToken });
        return response.data; // Возвращает новые accessToken и refreshToken
    } catch (error) {
        console.error('Ошибка при обновлении токенов:', error);
        throw error;
    }
};

export default authApi;