import styled from 'styled-components';

export const DashboardContainer = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

export const SectionTitle = styled.h2`
    font-size: 24px;
    color: #4A4A4A;
    margin-bottom: 20px;
`;

export const ProductList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const ProductItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    align-items: flex-start;
`;

export const ProductImage = styled.img`
    width: 150px;
    height: auto;
    margin-bottom: 10px;
    border-radius: 4px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;