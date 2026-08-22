// EXPORTADOR DE CONVERSAS DO WHATSAPP WEB (data da última mensagem por contato)
// Como usar: igual ao script de contatos —
// 1. Abra https://web.whatsapp.com no Chrome e espere carregar
// 2. F12 -> aba "Console" (digite "allow pasting" se o Chrome pedir)
// 3. Cole este script inteiro e aperte Enter
// 4. Baixa o arquivo conversas-whatsapp.csv com Nome;Telefone;UltimaConversa;DiasAtras

(async function exportarConversasWhatsApp() {
  const norm = (s) => (s || '').toString().replace(/[\r\n;]+/g, ' ').trim();
  let lista = [];

  // Método A: módulos internos do WhatsApp Web
  try {
    const Coll = window.require('WAWebCollections');
    lista = Coll.Chat.getModelsArray().map((c) => {
      const ct = c.contact || {};
      return {
        nome: norm(c.formattedTitle || c.name || ct.name || ct.pushname),
        telefone:
          (c.id && c.id.server === 'c.us' && c.id.user) ||
          (ct.phoneNumber && ct.phoneNumber.user) ||
          '',
        t: c.t || 0,
        grupo: !!(c.isGroup || (c.id && c.id.server === 'g.us')),
      };
    });
    console.log('Metodo A: ' + lista.length + ' conversas');
  } catch (e) {
    console.warn('Metodo A falhou (' + e.message + '). Tentando IndexedDB...');
  }

  // Método B (reserva): banco local do WhatsApp Web
  if (!lista.length) {
    const abrir = (nome) =>
      new Promise((res, rej) => {
        const rq = indexedDB.open(nome);
        rq.onsuccess = () => res(rq.result);
        rq.onerror = () => rej(rq.error);
      });
    const tudo = (db, store) =>
      new Promise((res, rej) => {
        const rq = db.transaction(store, 'readonly').objectStore(store).getAll();
        rq.onsuccess = () => res(rq.result);
        rq.onerror = () => rej(rq.error);
      });
    const db = await abrir('model-storage');
    const [chats, contatos] = await Promise.all([tudo(db, 'chat'), tudo(db, 'contact')]);
    const nomes = {};
    for (const c of contatos) nomes[c.id] = norm(c.name || c.verifiedName || c.pushname);
    lista = chats.map((c) => ({
      nome: nomes[c.id] || '',
      telefone:
        (typeof c.id === 'string' && c.id.endsWith('@c.us') && c.id.split('@')[0]) || '',
      t: c.t || 0,
      grupo: typeof c.id === 'string' && c.id.endsWith('@g.us'),
    }));
    console.log('Metodo B: ' + lista.length + ' conversas');
  }

  const agora = Math.floor(Date.now() / 1000);
  const finais = lista
    .filter((c) => !c.grupo && c.telefone && c.t > 0)
    .map((c) => {
      const d = new Date(c.t * 1000);
      const dias = Math.floor((agora - c.t) / 86400);
      const data =
        ('0' + d.getDate()).slice(-2) + '/' +
        ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
      return { nome: c.nome, telefone: c.telefone, data: data, dias: dias };
    })
    .sort((a, b) => a.dias - b.dias);

  console.log(
    'TOTAL: ' + finais.length + ' conversas individuais | ate 60 dias: ' +
    finais.filter((c) => c.dias <= 60).length + ' | ate 30 dias: ' +
    finais.filter((c) => c.dias <= 30).length + ' | mais de 1 ano: ' +
    finais.filter((c) => c.dias > 365).length
  );

  const linhas = ['Nome;Telefone;UltimaConversa;DiasAtras'];
  for (const c of finais) {
    linhas.push([c.nome, '="' + c.telefone + '"', c.data, c.dias].join(';'));
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(
    new Blob([String.fromCharCode(0xfeff) + linhas.join('\r\n')], {
      type: 'text/csv;charset=utf-8',
    })
  );
  a.download = 'conversas-whatsapp.csv';
  a.click();
  console.log('Arquivo baixado: conversas-whatsapp.csv');
})();
