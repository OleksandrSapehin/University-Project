import styled from 'styled-components';

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
    font-size: 16px;
    color: #333;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
`;

export const Textarea = styled.textarea`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    resize: vertical;
`;

export const SubmitButton = styled.button`
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #45a049;
    }
`;

export const ImagePreview = styled.img`
    width: 100px;
    height: auto;
    margin-top: 10px;
    border-radius: 4px;
`;
