import React, { useEffect, useState } from 'react';
import { getCartItems, removeFromCart, clearCart, updateCartItem } from '../api/cartApi';
import { createOrder } from '../api/orderApi';
import NavbarProduct from '../components/NavbarProduct';
import {
    CartContainer,
    CartItem,
    CartItemImage,
    CartItemDetails,
    CartItemName,
    CartItemPrice,
    RemoveButton,
    ClearCartButton,
    TotalAmount,
    CartHeader,
    QuantityControl,
    QuantityButton,
    QuantityInput,
    OrderButton,
} from '../styles/CartPage.styles';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const items = await getCartItems();
            setCartItems(items);
            calculateTotal(items);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        setTotalAmount(total);
    };

    const handleRemove = async (productId) => {
        try {
            await removeFromCart(productId);
            const updatedCart = cartItems.filter((item) => item.productId !== productId);
            setCartItems(updatedCart);
            calculateTotal(updatedCart);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
            setCartItems([]);
            setTotalAmount(0);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            const updatedItem = await updateCartItem(productId, newQuantity);
            const updatedCart = cartItems.map((item) =>
                item.productId === productId ? { ...item, quantity: updatedItem.quantity } : item
            );
            setCartItems(updatedCart);
            calculateTotal(updatedCart);
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const handleManualQuantityChange = async (productId, value) => {
        const newQuantity = parseInt(value, 10);
        if (isNaN(newQuantity) || newQuantity < 1) return;

        await handleQuantityChange(productId, newQuantity);
    };

    const handleOrder = async () => {
        try {
            await createOrder();
            alert('Заказ успешно оформлен!');
            await handleClearCart();
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);
            alert('Не удалось оформить заказ.');
        }
    };

    return (
        <>
            <NavbarProduct />
            <CartContainer>
                <CartHeader>Корзина</CartHeader>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItem key={item.productId}>
                            {item.imagePath && (
                                <CartItemImage
                                    src={`http://localhost:8081${item.imagePath}`}
                                    alt={item.name || 'Изображение товара'}
                                />
                            )}
                            <CartItemDetails>
                                <CartItemName>{item.name}</CartItemName>
                                <CartItemPrice>
                                    {item.price} ₽ x{' '}
                                    <QuantityControl>
                                        <QuantityButton
                                            onClick={() =>
                                                handleQuantityChange(item.productId, item.quantity - 1)
                                            }
                                        >
                                            -
                                        </QuantityButton>
                                        <QuantityInput
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleManualQuantityChange(
                                                    item.productId,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <QuantityButton
                                            onClick={() =>
                                                handleQuantityChange(item.productId, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </QuantityButton>
                                    </QuantityControl>
                                </CartItemPrice>
                            </CartItemDetails>
                            <RemoveButton onClick={() => handleRemove(item.productId)}>
                                Удалить
                            </RemoveButton>
                        </CartItem>
                    ))
                ) : (
                    <p>Корзина пуста</p>
                )}
                {cartItems.length > 0 && (
                    <>
                        <TotalAmount>Итоговая сумма: {totalAmount} ₽</TotalAmount>
                        <OrderButton onClick={handleOrder}>Оформить заказ</OrderButton>
                        <ClearCartButton onClick={handleClearCart}>Очистить корзину</ClearCartButton>
                    </>
                )}
            </CartContainer>
        </>
    );
};


export default CartPage;







