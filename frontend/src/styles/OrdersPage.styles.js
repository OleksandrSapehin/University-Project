import styled from 'styled-components';

export const OrdersContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: Arial, sans-serif;

    h1 {
        text-align: center;
        margin-bottom: 20px;
        color: ${({ theme }) => theme.colors.primaryGreen};
    }
`;
export const StatusLabel = styled.label`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.darkGreen};
    margin-right: 10px;
`;

export const OrderCard = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;

    h2 {
        margin-bottom: 10px;
        font-size: 20px;
        color: ${({ theme }) => theme.colors.darkGreen};
    }

    p {
        margin: 5px 0;
        font-size: 16px;
    }

    h3 {
        margin-top: 15px;
        font-size: 18px;
        color: ${({ theme }) => theme.colors.primaryGreen};
    }
`;

export const ProductList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const ProductItem = styled.li`
    background-color: ${({ theme }) => theme.colors.lightGrey};
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    font-size: 16px;

    strong {
        color: ${({ theme }) => theme.colors.darkGreen};
    }
`;

export const StatusSelect = styled.select`
    padding: 8px;
    margin-top: 10px;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.white};
`;

export const UpdateStatusButton = styled.button`
    padding: 10px 15px;
    margin-top: 10px;
    background-color: ${({ theme }) => theme.colors.primaryGreen};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.darkGreen};
    }
`;

