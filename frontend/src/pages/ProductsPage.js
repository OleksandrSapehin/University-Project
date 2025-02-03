import React, { useEffect, useState } from 'react';
import { addToCart } from '../api/cartApi';
import ModalOverlay from '../components/ModalOverlay';
import axios from 'axios';
import NavbarProduct from '../components/NavbarProduct';
import Register from '../components/Register';
import Login from '../components/Login';
import {
    ProductsContainer,
    ProductCard,
    ProductImage,
    ProductName,
    ProductPrice,
    ProductDescription,
    QuantityControl,
    QuantityButton,
    QuantityInput,
    AddToCartButton,
} from '../styles/ProductsPage.styles';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false); // Для модального окна логина
    const [showRegisterModal, setShowRegisterModal] = useState(false); // Для модального окна регистрации

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/admin/products/getAll');
                setProducts(response.data.map((product) => ({ ...product, quantity: 1 })));
            } catch (err) {
                setError('Ошибка при загрузке продуктов.');
            }
        };

        fetchProducts();
    }, []);

    const handleQuantityChange = (id, action) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                if (product.id === id) {
                    const newQuantity = action === 'increment' ? product.quantity + 1 : product.quantity - 1;
                    return { ...product, quantity: Math.max(newQuantity, 1) };
                }
                return product;
            })
        );
    };

    const handleManualQuantityChange = (id, value) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                if (product.id === id) {
                    const newQuantity = Math.max(Number(value), 1);
                    return { ...product, quantity: newQuantity };
                }
                return product;
            })
        );
    };

    const handleAddToCart = async (product) => {
        try {
            await addToCart(product.id, product.quantity);
            alert(`${product.name} добавлен в корзину!`);
        } catch (error) {
            console.error('Ошибка при добавлении товара в корзину:', error);
            alert('Не удалось добавить товар в корзину.');
        }
    };

    const switchToRegister = () => {
        setShowLoginModal(false);
        setShowRegisterModal(true);
    };

    const switchToLogin = () => {
        setShowRegisterModal(false);
        setShowLoginModal(true);
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <NavbarProduct
                onLoginClick={() => setShowLoginModal(true)}
            />
            <ProductsContainer>
                {products.map((product) => (
                    <ProductCard key={product.id}>
                        <ProductImage
                            src={`http://localhost:8081${product.imageUrl}`}
                            alt={product.name}
                        />
                        <ProductName>{product.name}</ProductName>
                        <ProductPrice>{product.price} ₽</ProductPrice>
                        <ProductDescription>{product.description}</ProductDescription>
                        <QuantityControl>
                            <QuantityButton
                                onClick={() => handleQuantityChange(product.id, 'decrement')}
                                disabled={product.quantity <= 1}
                            >
                                -
                            </QuantityButton>
                            <QuantityInput
                                type="text"
                                value={product.quantity}
                                onChange={(e) => handleManualQuantityChange(product.id, e.target.value)}
                            />
                            <QuantityButton
                                onClick={() => handleQuantityChange(product.id, 'increment')}
                            >
                                +
                            </QuantityButton>
                        </QuantityControl>
                        <AddToCartButton onClick={() => handleAddToCart(product)}>
                            Добавить в корзину
                        </AddToCartButton>
                    </ProductCard>
                ))}
            </ProductsContainer>
            {showLoginModal && (
                <ModalOverlay onClose={() => setShowLoginModal(false)}>
                    <Login onSwitchToRegister={switchToRegister} onClose={() => setShowLoginModal(false)} />
                </ModalOverlay>
            )}
            {showRegisterModal && (
                <ModalOverlay onClose={() => setShowRegisterModal(false)}>
                    <Register onSwitchToLogin={switchToLogin} onClose={() => setShowRegisterModal(false)} />
                </ModalOverlay>
            )}
        </>
    );
};

export default ProductsPage;





