import styled from 'styled-components';

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); /* Два продукта в ряд */
    gap: 30px; /* Пространство между продуктами */
    padding: 80px 10%;
    background-color: rgba(245, 245, 245, 1);/* Увеличенные отступы */
    justify-content: center; /* Центрируем контент */
`;

export const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.white}; /* Серый фон, как у навбара */
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Мягкая тень */
    text-align: center;
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    }
`;

export const ProductImage = styled.img`
    width: 90%;
    max-height: 250px; /* Ограничиваем высоту */
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 20px;
    border: 1px solid ${({ theme }) => theme.colors.darkGrey};
`;

export const ProductName = styled.h3`
    font-size: 1.6rem; /* Увеличенный размер шрифта */
    text-align: center;
    margin: 15px 0;
    color: ${({ theme }) => theme.colors.primaryGreen};
`;

export const ProductDescription = styled.p`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textGrey};
    text-align: justify; /* Выравниваем текст по ширине */
    margin: 10px 0;
    padding: 10px;
    line-height: 1.6; /* Увеличиваем межстрочный интервал */
    word-wrap: break-word; /* Переносим длинные слова */
    white-space: normal; /* Обычное поведение пробелов и переносов */
    max-width: 50ch; /* Ограничение ширины текста */
    height: auto; /* Автоматическая высота */
`;


export const ProductPrice = styled.p`
    font-size: 22px; /* Немного увеличиваем размер */
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gold};
    margin-bottom: 15px;
`;

export const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

export const QuantityButton = styled.button`
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

export const QuantityInput = styled.input`
    width: 50px;
    text-align: center;
    font-size: 16px;
    margin: 0 10px;
    appearance: none;
`;

export const AddToCartButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primaryGreen};
    color: white;
    border: none;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 8px;
    margin-top: 20px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.darkGreen};
    }
`;
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;
