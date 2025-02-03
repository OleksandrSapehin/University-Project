import axios from 'axios';

const API_URL = 'http://localhost:8082/orders';

const getAuthToken = () => localStorage.getItem('accessToken');

export const createOrder = async () => {
    try {
        const response = await axios.post(`${API_URL}/create`, null, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении заказов:', error);
        throw error;
    }


};
export const updateOrderStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(
        `${API_URL}/${orderId}/status`,
        null,
        {
            params: { newStatus },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};