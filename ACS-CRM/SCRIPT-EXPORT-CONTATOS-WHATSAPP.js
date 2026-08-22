// EXPORTADOR DE CONTATOS DO WHATSAPP WEB
// Como usar:
// 1. Abra https://web.whatsapp.com no Chrome e espere as conversas carregarem
// 2. Aperte F12 -> aba "Console"
// 3. Se o Chrome pedir, digite: allow pasting  (e Enter)
// 4. Cole este script inteiro e aperte Enter
// 5. Dois arquivos baixam na hora: contatos-whatsapp.csv (abre no Excel) e .json

(async function exportarContatosWhatsApp() {
  const norm = (s) => (s || '').toString().replace(/[\r\n;]+/g, ' ').trim();

  let lista = [];

  // Método A: módulos internos do WhatsApp Web (instantâneo)
  try {
    const Coll = window.require('WAWebCollections');
    const arr = Coll.Contact.getModelsArray();
    lista = arr.map((c) => ({
      nome: norm(c.name || c.verifiedName || c.pushname),
      telefone:
        (c.id && c.id.server === 'c.us' && c.id.user) ||
        (c.phoneNumber && c.phoneNumber.user) ||
        '',
      salvo: c.isMyContact ? 'Sim' : 'Nao',
      business: c.isBusiness ? 'Sim' : 'Nao',
      grupo: !!(c.isGroup || (c.id && c.id.server === 'g.us')),
    }));
    console.log('Metodo A (modulos internos): ' + lista.length + ' registros brutos');
  } catch (e) {
    console.warn('Metodo A falhou (' + e.message + '). Tentando IndexedDB...');
  }

  // Método B (reserva): banco local do WhatsApp Web
  if (!lista.length) {
    const db = await new Promise((res, rej) => {
      const req = indexedDB.open('model-storage');
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
    const regs = await new Promise((res, rej) => {
      const tx = db.transaction('contact', 'readonly');
      const rq = tx.objectStore('contact').getAll();
      rq.onsuccess = () => res(rq.result);
      rq.onerror = () => rej(rq.error);
    });
    lista = regs.map((c) => ({
      nome: norm(c.name || c.verifiedName || c.pushname),
      telefone:
        (typeof c.id === 'string' && c.id.endsWith('@c.us') && c.id.split('@')[0]) ||
        (c.phoneNumber && String(c.phoneNumber).split('@')[0]) ||
        '',
      salvo: c.isAddressBookContact === 1 || c.isMyContact ? 'Sim' : 'Nao',
      business: c.isBusiness ? 'Sim' : 'Nao',
      grupo: typeof c.id === 'string' && c.id.endsWith('@g.us'),
    }));
    console.log('Metodo B (IndexedDB): ' + lista.length + ' registros brutos');
  }

  // Limpeza: remove grupos, registros sem telefone e duplicados
  const vistos = new Set();
  const finais = lista
    .filter((c) => {
      if (c.grupo || !c.telefone) return false;
      if (vistos.has(c.telefone)) return false;
      vistos.add(c.telefone);
      return true;
    })
    .sort(
      (a, b) =>
        (b.salvo === 'Sim') - (a.salvo === 'Sim') || a.nome.localeCompare(b.nome)
    );

  const salvos = finais.filter((c) => c.salvo === 'Sim').length;
  console.log(
    'TOTAL EXPORTADO: ' + finais.length + ' contatos (' + salvos + ' salvos na agenda)'
  );

  // CSV no formato do Excel brasileiro (separador ;) — telefone protegido como texto
  const linhas = ['Nome;Telefone;Salvo na agenda;Business'];
  for (const c of finais) {
    linhas.push([c.nome, '="' + c.telefone + '"', c.salvo, c.business].join(';'));
  }
  const baixar = (conteudo, nome, tipo) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([conteudo], { type: tipo }));
    a.download = nome;
    a.click();
  };
  baixar('\uFEFF' + linhas.join('\r\n'), 'contatos-whatsapp.csv', 'text/csv;charset=utf-8');
  baixar(JSON.stringify(finais, null, 1), 'contatos-whatsapp.json', 'application/json');

  console.log('Arquivos baixados: contatos-whatsapp.csv e contatos-whatsapp.json');
})();
