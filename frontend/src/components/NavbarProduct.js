import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faShoppingCart, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const NavbarContainer = styled.nav.attrs((props) => ({
    style: {
        backgroundColor: `rgba(70, 70, 70, ${props.opacity})`,
    },
}))`
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    transition: background-color 0.3s ease;
    z-index: 10;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 20px;
    margin-left: auto;
    margin-right: 35px;
`;

const NavIconLink = styled.div`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.lightBrown};
    }
`;

const NavbarProduct = ({ onLoginClick, onRegisterClick }) => {
    const [opacity, setOpacity] = useState(1);
    const location = useLocation();

    const handleScroll = () => {
        const maxScroll = 200;
        const currentScroll = Math.min(window.scrollY, maxScroll);
        const newOpacity = 1 - currentScroll / maxScroll;
        setOpacity(Math.max(newOpacity, 0.3));
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <NavbarContainer opacity={opacity}>
            <NavLinks>
                {location.pathname !== '/' && (
                    <NavIconLink onClick={() => window.location.assign('/')}>
                        <FontAwesomeIcon icon={faHome} title="Продукты" size="lg" />
                    </NavIconLink>
                )}
                <NavIconLink onClick={onLoginClick}>
                    <FontAwesomeIcon icon={faUser} title="Вход" size="lg" />
                </NavIconLink>
                {location.pathname !== '/cart' && (
                    <NavIconLink onClick={() => window.location.assign('/cart')}>
                        <FontAwesomeIcon icon={faShoppingCart} title="Корзина" size="lg" />
                    </NavIconLink>
                )}
                {location.pathname !== '/orders' && (
                    <NavIconLink onClick={() => window.location.assign('/orders')}>
                        <FontAwesomeIcon icon={faClipboardList} title="Заказы" size="lg" />
                    </NavIconLink>
                )}
            </NavLinks>
        </NavbarContainer>
    );
};

export default NavbarProduct;


