// content.js  –  Manifest V3  –  FaculAgendaExtension
(() => {
  /* util ─ dd/mm/aa → yyyy-mm-dd (ISO) */
  const brToIso = (br) => {
    const [d, m, y] = br.split('/');
    return `20${y}-${m}-${d}`;               // 20yy-mm-dd
  };

  /* util ─ yyyy-mm-dd → YYYYMMDD */
  const isoToCal = (iso) => iso.replace(/-/g, '');

  /* util ─ soma N dias (UTC) e devolve yyyy-mm-dd */
  const addDays = (isoDate, n) => {
    const dt = new Date(`${isoDate}T00:00:00Z`);
    dt.setUTCDate(dt.getUTCDate() + n);
    return dt.toISOString().slice(0, 10);    // yyyy-mm-dd
  };

  /* percorre cada card de avaliação */
  document.querySelectorAll('.timeline-heading').forEach((heading) => {
    /* título da atividade */
    const titleNode = heading.querySelector('h4 small');
    if (!titleNode) return;
    const title = titleNode.textContent.trim();

    /* período dd/mm/aa - dd/mm/aa */
    const period = heading.textContent.match(
      /Período:\s*(\d{2}\/\d{2}\/\d{2})\s*-\s*(\d{2}\/\d{2}\/\d{2})/i
    );
    if (!period) return;
    const [, startBR, endBR] = period;

    /* converte p/ intervalo dia-inteiro */
    const startIso = brToIso(startBR);           // 2025-02-17
    const endIso   = addDays(brToIso(endBR), 1); // +1 dia  (exclusivo) → 2025-06-03
    const datesParam = `${isoToCal(startIso)}/${isoToCal(endIso)}`;

    /* monta link do Google Calendar */
    const gcal = new URL('https://calendar.google.com/calendar/render');
    gcal.searchParams.set('action',  'TEMPLATE');
    gcal.searchParams.set('text',    title);
    gcal.searchParams.set('dates',   datesParam);
    gcal.searchParams.set('details', 'Prazo para realizar a avaliação');
    gcal.searchParams.set('location','Campus virtual');
    gcal.searchParams.set('ctz',     'America/Sao_Paulo');
    gcal.searchParams.set('sf',      'true');
    gcal.searchParams.set('output',  'xml');

    /* cria botão */
    const btn = document.createElement('a');
    btn.href        = gcal.toString();
    btn.target      = '_blank';
    btn.rel         = 'noopener';
    btn.className   = 'btn btn-success';
    btn.style.marginLeft = '8px';
    btn.innerHTML   = '<i class="glyphicon glyphicon-calendar"></i> Adicionar Agenda';

    /* injeta após o botão “Iniciar” */
    const iniciar = heading.parentElement.querySelector('a.btn-primary');
    if (iniciar?.parentElement) {
      iniciar.parentElement.appendChild(btn);
    }
  });
})();
