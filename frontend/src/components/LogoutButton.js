import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Удаляем токен из localStorage
        window.localStorage.removeItem('accessToken');

        // Перенаправляем пользователя на страницу входа
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Выйти
        </button>
    );
};

export default LogoutButton;