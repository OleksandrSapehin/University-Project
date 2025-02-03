import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import {
    RegisterContainer,
    Overlay,
    FormContainer,
    Title,
    Input,
    RegisterButton,
    RegisterPrompt,
    RegisterLink,
} from '../styles/Register.styles';

const Register = ({ onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({ fullName: '', email: '', phoneNumber: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert('Регистрация успешна!');
            onClose(); // Закрыть модальное окно после регистрации
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка регистрации');
        }
    };

    return (
        <RegisterContainer>
            <Overlay onClick={onClose} />
            <FormContainer>
                <Title>Регистрация</Title>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="fullName"
                        placeholder="Ваше имя"
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Номер телефона"
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        onChange={handleChange}
                        required
                    />
                    <RegisterButton type="submit">Зарегистрироваться</RegisterButton>
                </form>
                <RegisterPrompt>
                    Уже зарегистрированы?{' '}
                    <RegisterLink onClick={onSwitchToLogin}>Войдите здесь</RegisterLink>
                </RegisterPrompt>
            </FormContainer>
        </RegisterContainer>
    );
};

export default Register;

