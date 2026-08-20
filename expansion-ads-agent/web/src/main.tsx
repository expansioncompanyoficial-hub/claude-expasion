import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './App';
import { ProvedorSessao } from './lib/contexto';
import { FalhaApi } from './lib/api';
import './estilos/base.css';
import './estilos/componentes.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: (tentativas, erro) => {
        // Sessão caída ou erro de permissão não melhora com nova tentativa.
        if (erro instanceof FalhaApi && [401, 403, 404, 422].includes(erro.status)) return false;
        return tentativas < 2;
      },
    },
    mutations: { retry: false },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ProvedorSessao>
          <App />
        </ProvedorSessao>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
