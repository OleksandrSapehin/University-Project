import axios from 'axios';

const API_URL = 'http://localhost:8083/cart';

const getAuthToken = () => localStorage.getItem('accessToken');

// Fetch cart items for the current customer
export const getCartItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/items`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

// Add a product to the cart
export const addToCart = async (productId, quantity) => {
    try {
        const response = await axios.post(
            `${API_URL}/add`,
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        throw error;
    }
};

// Remove a specific item from the cart
export const removeFromCart = async (productId) => {
    try {
        await axios.delete(`${API_URL}/remove`, {
            data: { productId },
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
};

// Clear the entire cart
export const clearCart = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        await axios.delete(`${API_URL}/clear`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};
export const updateCartItem = async (productId, quantity) => {
    try {
        const response = await axios.put(
            `${API_URL}/update`,
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
};