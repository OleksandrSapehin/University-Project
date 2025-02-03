import axios from 'axios';

const ADMIN_API_URL = 'http://localhost:8081/admin';// было админ

const adminApi = axios.create({
    baseURL: ADMIN_API_URL,
});

// Интерсептор для добавления токена в запросы и обработки ошибок
adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("Токен доступа отсутствует.");
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Обработка ошибок ответов
adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Если токен недействителен или отсутствует, выводим сообщение
            console.error("Неавторизован: проверьте токен доступа.");
            // Здесь вы можете перенаправить пользователя на страницу логина, если нужно
        }
        return Promise.reject(error.response ? error.response.data : error);
    }
);

export const getAllProducts = async () => {
    try {
        const response = await adminApi.get('/products/getAll');
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('amount', productData.amount);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('image', productData.image); // Добавляем изображение

        const response = await adminApi.post('/products/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании продукта:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData, imageFile) => {
    try {
        // Создаем новый объект FormData для отправки данных
        const formData = new FormData();

        // Добавляем обычные поля
        formData.append('name', productData.name);
        formData.append('amount', productData.amount);
        formData.append('description', productData.description);
        formData.append('price', productData.price);

        // Добавляем изображение, если оно есть
        if (imageFile) {
            formData.append('image', imageFile);
        }

        // Отправляем PUT-запрос
        const response = await adminApi.put(`/products/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении продукта:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await adminApi.delete(`/products/delete/${id}`);
    } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
        throw error;
    }
};

export default adminApi;