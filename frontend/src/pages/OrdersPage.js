import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../api/orderApi';
import {
    OrdersContainer,
    OrderCard,
    ProductList,
    ProductItem,
    StatusSelect,
    StatusLabel,
} from '../styles/OrdersPage.styles';

const statusMap = {
    PENDING: 'В ожидании',
    COMPLETED: 'Завершен',
    CANCELLED: 'Отменен',
};

const OrderPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const fetchedOrders = await getAllOrders();
            setOrders(fetchedOrders);
        } catch (error) {
            console.error('Ошибка при загрузке заказов:', error);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderId === orderId ? { ...order, status: newStatus } : order
                )
            );
            alert('Статус заказа обновлен!');
        } catch (error) {
            console.error('Ошибка при обновлении статуса:', error);
            alert('Не удалось обновить статус заказа.');
        }
    };

    return (
        <OrdersContainer>
            <h1>Список заказов</h1>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <OrderCard key={order.orderId}>
                        <h2>Заказ ID: {order.orderId}</h2>
                        <p>Имя клиента: {order.customerName}</p>
                        <p>Email клиента: {order.customerEmail}</p>
                        <p>Телефон клиента: {order.customerPhone}</p>
                        <p>Дата создания заказа: {new Date(order.completedAt).toLocaleString()}</p>
                        <p>Общая сумма: {order.totalAmount} Грн</p>
                        <StatusLabel>Статус:</StatusLabel>
                        <StatusSelect
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                        >
                            {Object.entries(statusMap).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </StatusSelect>
                        <h3>Товары:</h3>
                        <ProductList>
                            {order.products.map((product) => (
                                <ProductItem key={product.id}>
                                    <strong>{product.name}</strong> - {product.price} Грн (x
                                    {product.amount})
                                </ProductItem>
                            ))}
                        </ProductList>
                    </OrderCard>
                ))
            ) : (
                <p>Нет доступных заказов.</p>
            )}
        </OrdersContainer>
    );
};

export default OrderPage;
