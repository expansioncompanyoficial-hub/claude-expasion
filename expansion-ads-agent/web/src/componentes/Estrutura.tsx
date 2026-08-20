import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useCliente, useEstadoMeta, useSessao } from '../lib/contexto';
import { Selo } from './basicos';

const NAVEGACAO = [
  { para: '/', rotulo: 'Visão geral', icone: '◫', fim: true },
  { para: '/clientes', rotulo: 'Clientes', icone: '◍' },
  { para: '/nova-campanha', rotulo: 'Nova campanha', icone: '✦' },
  { para: '/campanhas', rotulo: 'Campanhas', icone: '≡' },
  { para: '/criativos', rotulo: 'Criativos', icone: '▣' },
  { para: '/aprovacoes', rotulo: 'Aprovações', icone: '✓', contadorAprovacoes: true },
  { para: '/relatorios', rotulo: 'Relatórios', icone: '◐' },
  { para: '/recomendacoes', rotulo: 'Recomendações', icone: '◈' },
  { para: '/auditoria', rotulo: 'Auditoria', icone: '⎘', papel: 'gestor' },
  { para: '/configuracoes', rotulo: 'Configurações', icone: '⚙' },
] as const;

function EstadoConexao() {
  const { data, isLoading } = useEstadoMeta();

  if (isLoading) return <Selo tom="neutro">Verificando Meta…</Selo>;
  if (!data) return <Selo tom="erro" ponto>Meta indisponível</Selo>;

  if (!data.credencialConfigurada) {
    return (
      <Selo tom="atencao" ponto>
        Meta sem credencial
      </Selo>
    );
  }
  if (!data.ok) {
    return (
      <Selo tom="erro" ponto>
        Meta com problema
      </Selo>
    );
  }
  return (
    <Selo tom="sucesso" ponto>
      Meta conectada · {data.versaoApi}
    </Selo>
  );
}

function SeletorCliente() {
  const { clientes, selecionada, selecionar, carregando } = useCliente();

  if (carregando) return <div className="esqueleto" style={{ width: 210, height: 34 }} />;
  if (clientes.length === 0) {
    return <Selo tom="atencao">Nenhuma cliente cadastrada</Selo>;
  }

  return (
    <div className="seletor-cliente">
      <span className="seletor-cliente__rotulo">Cliente</span>
      <select
        value={selecionada?.id ?? ''}
        onChange={(e) => selecionar(e.target.value || null)}
        aria-label="Cliente selecionada"
      >
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
            {c.exemplo ? ' (exemplo)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Estrutura() {
  const { usuario, sair, podeGerir } = useSessao();
  const { selecionada } = useCliente();
  const navegar = useNavigate();
  const { data: meta } = useEstadoMeta();

  const { data: aprovacoes } = useQuery({
    queryKey: ['campanhas', 'aguardando'],
    queryFn: () => api.get<{ campanhas: Array<{ id: string }> }>('/api/campaigns?estado=WAITING_APPROVAL'),
    enabled: Boolean(usuario),
    refetchInterval: 60_000,
  });

  const pendentes = aprovacoes?.campanhas.length ?? 0;
  const [menuAberto, setMenuAberto] = useState(false);
  const local = useLocation();

  // Navegar fecha a gaveta: no celular ela cobre a tela inteira.
  useEffect(() => {
    setMenuAberto(false);
  }, [local.pathname]);

  return (
    <div className="app">
      {menuAberto && (
        <button
          className="veu"
          aria-label="Fechar menu"
          onClick={() => setMenuAberto(false)}
        />
      )}
      <aside className={`lateral${menuAberto ? ' lateral--aberta' : ''}`}>
        <div className="lateral__marca">
          <div className="lateral__logo">
            <span className="lateral__simbolo">E</span>
            EXPANSION ADS
          </div>
          <div className="lateral__sub">Central de Inteligência e Gestão de Tráfego</div>
        </div>

        <nav className="lateral__nav" aria-label="Navegação principal">
          {NAVEGACAO.filter((item) => !('papel' in item) || podeGerir).map((item) => (
            <NavLink
              key={item.para}
              to={item.para}
              end={'fim' in item ? item.fim : false}
              className={({ isActive }) => `nav-item${isActive ? ' nav-item--ativo' : ''}`}
            >
              <span className="nav-item__icone" aria-hidden="true">
                {item.icone}
              </span>
              {item.rotulo}
              {'contadorAprovacoes' in item && pendentes > 0 && (
                <span className="nav-item__contador">{pendentes}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="lateral__rodape">
          <div className="linha-flex" style={{ gap: 6 }}>
            {meta?.dryRun ? (
              <Selo tom="atencao">Dry-run ligado</Selo>
            ) : (
              <Selo tom="erro" ponto>
                Dry-run desligado
              </Selo>
            )}
            {/* No celular a barra superior esconde o estado da Meta; aqui ele
                continua alcançável pela gaveta. */}
            <span className="so-mobile">
              <EstadoConexao />
            </span>
          </div>
          <div style={{ marginTop: 8 }}>
            {usuario?.nome} · {usuario?.papel}
          </div>
          {/* "Sair" vive aqui também: no celular o botão da barra superior some. */}
          <button
            className="botao botao--fantasma botao--pequeno so-mobile"
            style={{ marginTop: 10, width: '100%' }}
            onClick={() => void sair()}
          >
            Sair
          </button>
        </div>
      </aside>

      <div className="conteudo">
        <header className="topo">
          <button
            className="abrir-menu"
            onClick={() => setMenuAberto((a) => !a)}
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
          >
            ☰
          </button>
          <SeletorCliente />
          {selecionada && (
            <span className="mono so-desktop" title="Conta de anúncios em uso">
              {selecionada.conta}
            </span>
          )}
          <div className="topo__espaco so-desktop" />
          <span className="so-desktop">
            <EstadoConexao />
          </span>
          <button
            className="botao botao--primario"
            onClick={() => navegar('/nova-campanha')}
            title="Nova campanha"
          >
            <span aria-hidden="true">+</span>
            <span className="so-desktop">Nova campanha</span>
          </button>
          <button
            className="botao botao--fantasma botao--pequeno so-desktop"
            onClick={() => void sair()}
          >
            Sair
          </button>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
