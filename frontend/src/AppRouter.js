import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './pages/AdminDashboard';
import ProductsPage from './pages/ProductsPage'; // Импортируем страницу продуктов
import CartPage from './pages/CartPage';// Импортируем страницу корзины
import OrdersPage from './pages/OrdersPage';


const AppRouter = () => (
    <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
    </Routes>
);

export default AppRouter;