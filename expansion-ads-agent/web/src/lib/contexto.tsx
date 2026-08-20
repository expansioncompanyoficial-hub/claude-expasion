import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api';
import type { Cliente, EstadoMeta, Usuario } from './tipos';

interface SessaoCtx {
  usuario: Usuario | null;
  carregando: boolean;
  entrar: (email: string, senha: string) => Promise<void>;
  sair: () => Promise<void>;
  podeOperar: boolean;
  podeGerir: boolean;
  ehAdmin: boolean;
}

const SessaoContexto = createContext<SessaoCtx | null>(null);

const FORCA: Record<string, number> = {
  visualizador: 1,
  operador: 2,
  gestor: 3,
  admin: 4,
};

export function ProvedorSessao({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    api
      .get<{ usuario: Usuario | null }>('/api/auth/me')
      .then((r) => setUsuario(r.usuario ?? null))
      .catch(() => setUsuario(null))
      .finally(() => setCarregando(false));
  }, []);

  const valor = useMemo<SessaoCtx>(() => {
    const forca = usuario ? (FORCA[usuario.papel] ?? 0) : 0;
    return {
      usuario,
      carregando,
      podeOperar: forca >= 2,
      podeGerir: forca >= 3,
      ehAdmin: forca >= 4,
      entrar: async (email, senha) => {
        const r = await api.post<{ usuario: Usuario }>('/api/auth/login', { email, senha });
        setUsuario(r.usuario);
        await queryClient.invalidateQueries();
      },
      sair: async () => {
        await api.post('/api/auth/logout');
        setUsuario(null);
        queryClient.clear();
      },
    };
  }, [usuario, carregando, queryClient]);

  return <SessaoContexto.Provider value={valor}>{children}</SessaoContexto.Provider>;
}

export function useSessao(): SessaoCtx {
  const ctx = useContext(SessaoContexto);
  if (!ctx) throw new Error('useSessao fora do ProvedorSessao.');
  return ctx;
}

/* ------------------------------------------------------------------ cliente */

interface ClienteCtx {
  clientes: Cliente[];
  carregando: boolean;
  selecionada: Cliente | null;
  selecionar: (id: string | null) => void;
}

const ClienteContexto = createContext<ClienteCtx | null>(null);

const CHAVE_CLIENTE = 'expansion.cliente';

export function ProvedorCliente({ children }: { children: ReactNode }) {
  const { usuario } = useSessao();
  const [id, setId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(CHAVE_CLIENTE);
    } catch {
      return null;
    }
  });

  const { data, isLoading } = useQuery({
    queryKey: ['clientes'],
    queryFn: () => api.get<{ clientes: Cliente[] }>('/api/clients'),
    enabled: Boolean(usuario),
  });

  const clientes = data?.clientes ?? [];

  // Uma cliente sempre selecionada quando existe pelo menos uma: a tela precisa
  // deixar evidente em qual conta se está operando.
  useEffect(() => {
    if (clientes.length === 0) return;
    if (!id || !clientes.some((c) => c.id === id)) {
      const primeira = clientes[0]!.id;
      setId(primeira);
      try {
        localStorage.setItem(CHAVE_CLIENTE, primeira);
      } catch {
        /* modo privado: segue sem lembrar */
      }
    }
  }, [clientes, id]);

  const valor = useMemo<ClienteCtx>(
    () => ({
      clientes,
      carregando: isLoading,
      selecionada: clientes.find((c) => c.id === id) ?? null,
      selecionar: (novo) => {
        setId(novo);
        try {
          if (novo) localStorage.setItem(CHAVE_CLIENTE, novo);
          else localStorage.removeItem(CHAVE_CLIENTE);
        } catch {
          /* ignora */
        }
      },
    }),
    [clientes, isLoading, id],
  );

  return <ClienteContexto.Provider value={valor}>{children}</ClienteContexto.Provider>;
}

export function useCliente(): ClienteCtx {
  const ctx = useContext(ClienteContexto);
  if (!ctx) throw new Error('useCliente fora do ProvedorCliente.');
  return ctx;
}

export function useEstadoMeta() {
  const { usuario } = useSessao();
  return useQuery({
    queryKey: ['meta-status'],
    queryFn: () => api.get<EstadoMeta>('/api/meta/status'),
    enabled: Boolean(usuario),
    refetchInterval: 120_000,
  });
}
