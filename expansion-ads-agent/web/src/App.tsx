import { Navigate, Route, Routes } from 'react-router-dom';
import { ProvedorCliente, useSessao } from './lib/contexto';
import { Estrutura } from './componentes/Estrutura';
import { Login } from './telas/Login';
import { VisaoGeral } from './telas/VisaoGeral';
import { Clientes, ClienteDetalhe } from './telas/Clientes';
import { Campanhas, CampanhaDetalhe } from './telas/Campanhas';
import { Aprovacoes } from './telas/Aprovacoes';
import { Auditoria } from './telas/Auditoria';
import { Criativos } from './telas/Criativos';
import { Relatorios } from './telas/Relatorios';
import { Recomendacoes } from './telas/Recomendacoes';
import { Configuracoes } from './telas/Configuracoes';
import { Assistente } from './assistente/Assistente';

export function App() {
  const { usuario, carregando } = useSessao();

  if (carregando) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <div className="esqueleto" style={{ width: 190, height: 34 }} />
      </div>
    );
  }

  if (!usuario) return <Login />;

  return (
    <ProvedorCliente>
      <Routes>
        <Route element={<Estrutura />}>
          <Route path="/" element={<VisaoGeral />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/:id" element={<ClienteDetalhe />} />
          <Route path="/nova-campanha" element={<Assistente />} />
          <Route path="/campanhas" element={<Campanhas />} />
          <Route path="/campanhas/:id" element={<CampanhaDetalhe />} />
          <Route path="/criativos" element={<Criativos />} />
          <Route path="/aprovacoes" element={<Aprovacoes />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/recomendacoes" element={<Recomendacoes />} />
          <Route path="/auditoria" element={<Auditoria />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ProvedorCliente>
  );
}
