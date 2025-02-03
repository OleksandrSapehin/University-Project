import styled from 'styled-components';

export const RegisterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 1;
`;

export const FormContainer = styled.div`
    position: relative;
    z-index: 2;
    max-width: 400px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 8px;
    text-align: center; /* Центрируем содержимое */
`;

export const Title = styled.h2`
    font-size: 24px;
    color: ${({ theme }) => theme.colors.primaryGreen};
    margin-bottom: 20px;
`;

export const Input = styled.input`
    display: block; /* Чтобы убрать выравнивание в строку */
    width: calc(100% - 24px); /* Учитываем padding для точной ширины */
    margin: 10px auto; /* Центрирование поля */
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.primaryGreen};
    border-radius: 4px;
    font-size: 16px;
`;

export const RegisterButton = styled.button`
    display: block; /* Чтобы кнопка тоже центрировалась */
    width: calc(100% - 24px); /* Учитываем padding */
    padding: 12px;
    margin: 20px auto 0; /* Центрируем кнопку */
    background-color: ${({ theme }) => theme.colors.primaryGreen};
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white};
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.darkGreen};
    }
`;

export const RegisterPrompt = styled.div`
    margin-top: 20px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textGrey};
    text-align: center; /* Центрируем текст */
`;

export const RegisterLink = styled.span`
    color: ${({ theme }) => theme.colors.primaryGreen};
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
        color: ${({ theme }) => theme.colors.darkGreen};
    }
`;
