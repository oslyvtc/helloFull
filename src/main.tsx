import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { QueryClientProvider } from '@tanstack/react-query';

import { BrowserRouter } from 'react-router';

import App from './App';
import './index.css';
import './i18n/i18n';

import { queryClient } from './lib/queryClient';
import { theme } from './theme/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
