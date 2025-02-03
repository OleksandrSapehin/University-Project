import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background};
    font-family: Arial, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.primaryGreen};
  }

  a {
    color: ${({ theme }) => theme.colors.darkGreen};
    text-decoration: none;
  }
  
  
`;
