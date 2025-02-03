import React, { useState } from 'react';
import { loginUser } from '../api/authApi';
import { jwtDecode } from 'jwt-decode';
import {
    LoginContainer,
    Overlay,
    FormContainer,
    Title,
    Input,
    LoginButton,
    RegisterPrompt,
    RegisterLink,
} from '../styles/Login.styles';

const Login = ({ onClose, onSwitchToRegister }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { accessToken } = await loginUser(formData);
            localStorage.setItem('accessToken', accessToken);

            const decodedToken = jwtDecode(accessToken);
            const userRole = decodedToken.role;

            alert(`Вы вошли как: ${userRole}`);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка авторизации');
        }
    };

    return (
        <LoginContainer>
            <Overlay onClick={onClose} />
            <FormContainer>
                <Title>Вход</Title>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
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
                    <LoginButton type="submit">Войти</LoginButton>
                </form>
                <RegisterPrompt>
                    Еще не зарегистрированы?{' '}
                    <RegisterLink onClick={onSwitchToRegister}>
                        Зарегистрируйтесь здесь
                    </RegisterLink>
                </RegisterPrompt>
            </FormContainer>
        </LoginContainer>
    );
};

export default Login;
