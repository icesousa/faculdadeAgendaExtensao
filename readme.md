# Botão Agenda  Kroton

Adiciona um botão **“Adicionar ao Google Agenda”** em cada card de avaliação no Ambiente Virtual de Aprendizagem (AVA) da Anhanguera.

---

## ✨ Por que esta extensão existe

Muitos alunos acabam esquecendo o prazo total para realizar as provas e atividades, pois o AVA exibe apenas a data de início. Esta extensão cria um evento de vários dias no Google Agenda que cobre **todo o intervalo de disponibilidade** (ex.: **17 fev – 2 jun**), ajudando você a receber lembretes automáticos e se planejar melhor.

---

## ⚙️ Como funciona

1. Um **content script** (`content.js`) é executado em páginas que correspondem a `https://*.faculdade.edu.br/*` (você pode ajustar em `manifest.json`).
2. O script percorre cada elemento `.timeline-heading` e extrai:

   * **Título** (`Av2 – Engenharia de Software`);
   * **Período de realização** (`dd/mm/aa – dd/mm/aa`).
3. Converte as datas para o formato de evento de vários dias (dia inteiro) exigido pelo Google Agenda (`YYYYMMDD/YYYYMMDD+1`).
4. Gera a URL do Agenda (`action=TEMPLATE`, `ctz=America/Sao_Paulo`) e a abre em uma nova aba quando o botão é clicado.

Tudo é processado localmente no navegador; **nenhum dado** é enviado a servidores externos.

---

## 🖥️ Instalação (Chrome / Edge / Brave)

1. Baixe ou clone este repositório.
2. Acesse `chrome://extensions/` e ative o **Modo do desenvolvedor**.
3. Clique em **Carregar sem compactação** e selecione a pasta do projeto.
4. Recarregue a página do AVA — o botão verde de calendário aparecerá ao lado de **Iniciar**.

> **Firefox** — carregue como complemento temporário em `about:debugging#/runtime/this-firefox`. Manifest V3 é suportado a partir da versão 109.

---

## ✅ Status atual

* **Testado em:** AVA Anhanguera (jun/2025).
* **Compatibilidade potencial:** Outros portais do grupo Kroton que utilizam o mesmo front‑end (Pitágoras, Unopar, Unime, etc.).
* **Limitações:** Se o HTML da sua instituição for diferente, talvez seja necessário ajustar os seletores CSS em `content.js`.

---

## 🤝 Contribuições

Contribuições são **muito bem‑vindas**! Você pode:

* Abrir *issues* (inclua um trecho de HTML de exemplo se possível).
* Enviar *pull requests* para melhorar a extração, adicionar suporte a Outlook/ICS ou ampliar os domínios atendidos.
* Testar em outros portais Kroton e compartilhar feedback.

### Ambiente de desenvolvimento

```bash
# clonar e instalar
git clone https://github.com/seu-usuario/botao-agenda-provas-kroton.git
cd botao-agenda-provas-kroton
npm install   # só se você quiser usar ferramentas de build
```

Depois carregue a pasta como extensão não compactada.  Edite `content.js`, salve e clique em **Atualizar** na página de extensões para ver as mudanças.

---

## 📝 Licença

[MIT](LICENSE)
