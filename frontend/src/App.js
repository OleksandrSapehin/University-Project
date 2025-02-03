import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { theme } from './theme';
import AppRouter from './AppRouter';

function App() {
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <AppRouter />
        </Router>
      </ThemeProvider>
  );
}

export default App;