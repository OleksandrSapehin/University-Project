import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav.attrs((props) => ({
    style: {
        backgroundColor: props.isTransparent ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
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


const Logo = styled.h1`
    font-family: 'Playfair Display', serif;
    color: ${({ theme }) => theme.colors.white};
    font-size: 30px;
    font-weight: 700;
    margin: 0;
    position: absolute; 
    left: 50%;
    transform: translateX(-50%);
`;

const NavLinks = styled.div`
    display: flex;
    gap: 20px;
    margin-left: auto;
`;

const NavLink = styled(Link)`
    color: ${({ theme }) => theme.colors.white};
    font-size: 18px;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        color: ${({ theme }) => theme.colors.lightBrown};
    }

    &.active {
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.lightBrown};
    }
`;

const Navbar = () => {
    const [isTransparent, setIsTransparent] = useState(true);

    const handleScroll = () => {
        setIsTransparent(window.scrollY === 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <NavbarContainer isTransparent={isTransparent}>
            <Logo>Саженцы фундука</Logo>
            <NavLinks>
                {/*<NavLink to="/">Главная</NavLink>*/}
                <NavLink to="/">Продукты</NavLink>
                <NavLink to="/login">Вход</NavLink>
                <NavLink to="/cart">Корзина</NavLink>
                {/*<NavLink to="/admin">Админ</NavLink>*/}
            </NavLinks>
        </NavbarContainer>
    );
};

export default Navbar;









