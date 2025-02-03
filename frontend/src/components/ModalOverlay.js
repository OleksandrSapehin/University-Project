import React from 'react';
import styled from 'styled-components';

const ModalOverlayWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); /* Полупрозрачный фон */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Поверх всего */
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    max-width: 400px;
    width: 90%;
    z-index: 1001; /* Убедитесь, что контент выше, чем фон */
`;

const ModalOverlay = ({ children, onClose }) => (
    <ModalOverlayWrapper onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
            {children}
        </ModalContent>
    </ModalOverlayWrapper>
);

export default ModalOverlay;
