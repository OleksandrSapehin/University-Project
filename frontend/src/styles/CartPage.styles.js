import styled from 'styled-components';

export const CartContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 80px auto 0; /* Добавляем верхний отступ для заголовка */
`;

export const TotalAmount = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
    text-align: right;
    color: #333;
`;

export const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
`;

export const QuantityButton = styled.button`
    padding: 5px 10px;
    font-size: 16px;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    cursor: pointer;
    &:hover {
        background-color: #ddd;
    }
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const OrderButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primaryGreen};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    padding: 10px 15px; /* Уменьшили размер */
    font-size: 16px; /* Уменьшили шрифт */
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.darkGreen};
        transform: translateY(-2px); /* Небольшой эффект при наведении */
    }

    &:active {
        transform: translateY(0); /* Убираем эффект при клике */
    }
`;

export const ClearCartButton = styled(OrderButton)`
    background-color: #ff4d4d;

    &:hover {
        background-color: #e60000;
    }
`;

export const QuantityInput = styled.input`
    width: 50px;
    text-align: center;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;

    /* Убираем стрелки для всех браузеров */
    -moz-appearance: textfield; /* Firefox */
    -webkit-appearance: none; /* Chrome, Safari, Edge */
    appearance: none; /* Универсальный стиль */

    /* Убираем для мобильных устройств */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        outline: none;
        border-color: #4caf50;
    }
`;

export const CartItem = styled.div`
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CartItemImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
`;

export const CartItemDetails = styled.div`
    flex: 1;
`;

export const CartItemName = styled.h3`
    font-size: 18px;
    margin: 0;
`;

export const CartItemPrice = styled.p`
    font-size: 16px;
    color: #4caf50;
    margin: 5px 0 0;
`;

export const RemoveButton = styled.button`
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #e60000;
    }
`;

export const CartHeader = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    margin-top: 0; /* Убираем лишний отступ сверху */
    color: #4CAF50;
    text-align: center; /* Центрируем заголовок */
`;