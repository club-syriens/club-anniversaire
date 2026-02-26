// ─── RENDER MODULE ────────────────────────────────────────────────────────────
// Toutes les fonctions d'affichage, organisées par section
// ─────────────────────────────────────────────────────────────────────────────

const Render = (() => {

  // ── BADGES sidebar ────────────────────────────────────────────────────────
  function badges() {
    document.getElementById('b-tasks').textContent  = window.S.tasks.filter(t => t.status !== 'منجز').length;
    document.getElementById('b-vol').textContent    = window.S.volunteers.length;
    document.getElementById('b-prov').textContent   = window.S.providers.length;
    document.getElementById('b-guests').textContent = window.S.guests.length;
    document.getElementById('b-ven').textContent    = window.S.venues.length;
  }

  // ── DASHBOARD ─────────────────────────────────────────────────────────────
  function dashboard() {
    const { tasks, budget, volunteers, guests, providers } = window.S;

    const done = tasks.filter(t => t.status === 'منجز').length;
    document.getElementById('d-tdone').textContent = done;
    document.getElementById('d-ttot').textContent  = 'sur ' + tasks.length;

    const inc = budget.filter(b => b.type === 'Revenu').reduce((s, b) => s + b.amount, 0);
    const exp = budget.filter(b => b.type === 'Dépense').reduce((s, b) => s + b.amount, 0);
    document.getElementById('d-inc').textContent = fmt(inc);
    document.getElementById('d-exp').textContent = fmt(exp);
    document.getElementById('d-bl').textContent  = fmt(inc - exp);
    document.getElementById('d-bal').textContent = fmt(inc - exp);
    document.getElementById('d-vol').textContent  = volunteers.length;
    document.getElementById('d-tix').textContent  = guests.filter(g => g.status === 'Confirmé').length;
    document.getElementById('d-prov').textContent = providers.length;

    const pct = inc > 0 ? Math.min(100, Math.round(exp / inc * 100)) : 0;
    document.getElementById('d-bbar').style.width = pct + '%';
    document.getElementById('d-blbl').textContent = 'Dépenses : ' + pct + '% du total revenus estimés';

    // Progression par département
    let ph = '';
    Object.entries(window.DEPTS).forEach(([ar, d]) => {
      const dt = tasks.filter(t => t.dept === ar);
      if (!dt.length) return;
      const dd = dt.filter(t => t.status === 'منجز').length;
      ph += `<div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px">
          <span style="font-weight:600">${d.icon} ${d.fr}</span>
          <span style="color:var(--muted)">${dd}/${dt.length}</span>
        </div>
        <div class="pb"><div class="f" style="width:${Math.round(dd/dt.length*100)}%;background:${d.color}"></div></div>
      </div>`;
    });
    document.getElementById('d-progress').innerHTML = ph;

    // Tâches urgentes/en cours
    const prog = tasks.filter(t => t.status === 'قيد الانجاز').slice(0, 5);
    const show  = prog.length ? prog : tasks.filter(t => t.status !== 'منجز').slice(0, 4);
    document.getElementById('d-urgent').innerHTML = show.map(t => `
      <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
        <span>${sIco(t.status)}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.fr}</div>
          <div style="font-size:11px;color:var(--muted)">${window.DEPTS[t.dept]?.icon||''} ${window.DEPTS[t.dept]?.fr||t.dept}${t.owner?' · '+t.owner:''}${t.date?' · '+fmtD(t.date):''}</div>
        </div>
        <span class="b ${bCls(t.status)}" style="white-space:nowrap">${sFr(t.status)}</span>
      </div>`).join('') || '<p style="color:var(--muted);font-size:13px;padding:8px 0">Toutes les tâches restent à démarrer 🚀</p>';
  }

  // ── TÂCHES ────────────────────────────────────────────────────────────────
  function tasks() {
    const df = document.getElementById('ts-dept');
    if (df && df.options.length <= 1) {
      Object.entries(window.DEPTS).forEach(([ar, d]) => {
        const o = document.createElement('option');
        o.value = ar; o.textContent = d.icon + ' ' + d.fr;
        df.appendChild(o);
      });
    }
    const q   = (document.getElementById('ts-q')?.value || '').toLowerCase();
    const dpt = document.getElementById('ts-dept')?.value || '';
    const st  = document.getElementById('ts-status')?.value || '';

    const filtered = window.S.tasks.filter(t =>
      (!q  || (t.fr.toLowerCase().includes(q) || t.ar.includes(q) || (t.owner||'').toLowerCase().includes(q))) &&
      (!dpt || t.dept === dpt) &&
      (!st  || t.status === st)
    );

    const grouped = {};
    filtered.forEach(t => { (grouped[t.dept] = grouped[t.dept] || []).push(t); });

    let html = '';
    Object.entries(window.DEPTS).forEach(([ar, d]) => {
      if (!grouped[ar]) return;
      const ts  = grouped[ar];
      const dd  = ts.filter(t => t.status === 'منجز').length;
      const cid = 'cat' + ar.replace(/\s/g, '_');
      html += `
        <div class="cat-hdr" onclick="tgl('${cid}')">
          <span style="font-size:18px">${d.icon}</span>
          <span class="cat-title">${d.fr}</span>
          <span class="cat-ar">${ar}</span>
          <span class="cat-stats">${dd}/${ts.length} terminées</span>
        </div>
        <div class="cat-body" id="${cid}">
          <div class="card" style="margin-bottom:0;border-radius:0 0 12px 12px;border-top:3px solid ${d.color}">
            <div class="tw"><table><thead><tr>
              <th>Tâche (FR)</th><th>المهمة</th><th>Responsable</th><th>Bénévoles</th><th>Échéance</th><th>Statut</th><th>—</th>
            </tr></thead><tbody>
            ${ts.map(t => `<tr>
              <td><strong>${t.fr}</strong>${t.notes ? '<br><span style="font-size:11px;color:var(--muted)">'+t.notes+'</span>' : ''}</td>
              <td><span class="ar">${t.ar}</span></td>
              <td>${t.owner || '—'}</td>
              <td style="font-size:12px;color:var(--muted)">${t.vols || '—'}</td>
              <td>${t.date ? fmtD(t.date) : '—'}</td>
              <td><span class="b ${bCls(t.status)}">${sFr(t.status)}</span></td>
              <td><div class="actb">
                <button class="icb" onclick="Forms.editTask(${t.id})">✏️</button>
                <button class="icb" onclick="cycleStatus(${t.id})" title="Changer statut">🔄</button>
                <button class="icb del" onclick="delItem('tasks',${t.id})">🗑️</button>
              </div></td>
            </tr>`).join('')}
            </tbody></table></div>
          </div>
        </div>`;
    });
    document.getElementById('tasks-cont').innerHTML = html || '<p style="color:var(--muted);padding:20px">Aucune tâche trouvée</p>';
  }

  // ── BUDGET ────────────────────────────────────────────────────────────────
  function budget() {
    const inc = window.S.budget.filter(b => b.type === 'Revenu').reduce((s, b)  => s + b.amount, 0);
    const exp = window.S.budget.filter(b => b.type === 'Dépense').reduce((s, b) => s + b.amount, 0);
    document.getElementById('bi-inc').textContent = fmt(inc);
    document.getElementById('bi-exp').textContent = fmt(exp);
    document.getElementById('bi-bal').textContent = fmt(inc - exp);
    document.getElementById('budget-tbl').innerHTML = window.S.budget.map(b => `<tr>
      <td><strong>${b.desc}</strong></td><td>${b.cat}</td>
      <td><span style="color:${b.type==='Revenu'?'var(--green)':'var(--red)'};font-weight:700">${b.type}</span></td>
      <td><strong>${fmt(b.amount)}</strong></td>
      <td><span class="b ${b.status==='Payé'?'b-done':b.status==='Confirmé'?'b-prog':'b-pend'}">${b.status}</span></td>
      <td><div class="actb">
        <button class="icb" onclick="Forms.editBudget(${b.id})">✏️</button>
        <button class="icb del" onclick="delItem('budget',${b.id})">🗑️</button>
      </div></td>
    </tr>`).join('');
  }

  // ── LIEUX ─────────────────────────────────────────────────────────────────
  function venues() {
    const sc = { Confirmé:'var(--green)', Visité:'var(--gold)', 'À visiter':'#6b7280', Refusé:'var(--red)' };
    document.getElementById('venues-grid').innerHTML = window.S.venues.map(v => `
      <div class="vc">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:10px">
          <h3>${v.name}</h3>
          <span style="background:${sc[v.status]||'#6b7280'};color:#fff;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;white-space:nowrap">${v.status}</span>
        </div>
        <div class="meta">
          ${v.addr ? '<span>📍 '+v.addr+'</span>' : ''}
          ${v.cap  ? '<span>👥 '+v.cap+' personnes</span>' : ''}
          <span>💶 ${v.price === 0 ? 'Gratuit / Offert' : fmt(v.price)}</span>
          ${v.notes ? '<span style="margin-top:4px;font-style:italic;font-size:11px">'+v.notes+'</span>' : ''}
        </div>
        <div style="display:flex;gap:6px;margin-top:12px">
          <button class="btn btn-out btn-sm" onclick="Forms.editVenue(${v.id})">✏️ Modifier</button>
          <button class="btn btn-sm" style="background:#fee2e2;color:var(--red);border:none;cursor:pointer" onclick="delItem('venues',${v.id})">🗑️</button>
        </div>
      </div>`).join('') || '<p style="color:var(--muted);padding:20px">Aucun lieu</p>';
  }

  // ── BÉNÉVOLES ─────────────────────────────────────────────────────────────
  function volunteers() {
    const ac = { Disponible:'b-done', Partiellement:'b-prog', 'Non disponible':'b-canc' };
    document.getElementById('vol-tbl').innerHTML = window.S.volunteers.map(v => `<tr>
      <td><strong>${v.name}</strong></td><td>${v.role||'—'}</td>
      <td>${v.email||'—'}</td><td>${v.phone||'—'}</td>
      <td><span class="b ${ac[v.avail]||'b-todo'}">${v.avail}</span></td>
      <td><div class="actb">
        <button class="icb" onclick="Forms.editVol(${v.id})">✏️</button>
        <button class="icb del" onclick="delItem('volunteers',${v.id})">🗑️</button>
      </div></td>
    </tr>`).join('');
  }

  // ── PRESTATAIRES ──────────────────────────────────────────────────────────
  function providers() {
    const sc = { 'À contacter':'b-todo', Contacté:'b-pend', 'En négociation':'b-prog', Confirmé:'b-done', Refusé:'b-canc' };
    document.getElementById('prov-tbl').innerHTML = window.S.providers.map(p => `<tr>
      <td><strong>${p.name}</strong></td><td>${p.cat}</td><td>${p.contact||'—'}</td>
      <td>${p.price ? fmt(p.price) : '—'}</td>
      <td><span class="b ${sc[p.status]||'b-todo'}">${p.status}</span></td>
      <td style="font-size:12px;color:var(--muted);max-width:200px">${p.notes||'—'}</td>
      <td><div class="actb">
        <button class="icb" onclick="Forms.editProv(${p.id})">✏️</button>
        <button class="icb del" onclick="delItem('providers',${p.id})">🗑️</button>
      </div></td>
    </tr>`).join('');
  }

  // ── INVITÉS ───────────────────────────────────────────────────────────────
  function guests() {
    const q  = (document.getElementById('gs-q')?.value || '').toLowerCase();
    const f  = document.getElementById('gs-f')?.value || '';
    const fl = window.S.guests.filter(g =>
      (!q || g.name.toLowerCase().includes(q) || (g.email||'').toLowerCase().includes(q)) &&
      (!f || g.status === f)
    );
    const sc = { Confirmé:'b-done', 'En attente':'b-pend', Annulé:'b-canc' };
    document.getElementById('guests-tbl').innerHTML = fl.map(g => `<tr>
      <td><strong>${g.name}</strong></td><td>${g.email||'—'}</td><td>${g.phone||'—'}</td>
      <td><span class="b ${sc[g.status]||'b-todo'}">${g.status}</span></td>
      <td><span style="color:${g.ticket==='Oui'?'var(--green)':'var(--red)'};font-weight:700">${g.ticket}</span></td>
      <td style="font-size:12px;color:var(--muted)">${g.notes||'—'}</td>
      <td><div class="actb">
        <button class="icb" onclick="Forms.editGuest(${g.id})">✏️</button>
        <button class="icb del" onclick="delItem('guests',${g.id})">🗑️</button>
      </div></td>
    </tr>`).join('') || '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px">Aucun invité — cliquez sur + pour en ajouter</td></tr>';

    const el = document.getElementById('g-cnt');
    if (el) el.textContent = fl.length + ' invité(s) · ' + window.S.guests.filter(g => g.status === 'Confirmé').length + ' confirmé(s) · ' + window.S.guests.filter(g => g.ticket === 'Oui').length + ' tickets payés';
  }

  // ── PROGRAMME checklist ───────────────────────────────────────────────────
  const PROG_ITEMS = [
    "Créer le poster Save the Date",
    "Ouvrir la vente des billets (25€)",
    "Finaliser l'artiste musical syrien",
    "Finaliser le stand-up comique",
    "Préparer le quiz Typeform (Arabe/Français)",
    "Confirmer les entrepreneurs pour le pitch",
    "Produire la vidéo histoire du club",
    "Créer la présentation PowerPoint du club",
    "Contacter le prestataire Photo Booth",
    "Confirmer la salle avec Mona",
    "Créer le groupe WhatsApp bénévoles",
    "Publier les annonces réseaux sociaux"
  ];
  let progCk = JSON.parse(localStorage.getItem('csa_pc') || '[]');

  function progChecklist() {
    document.getElementById('prog-ck').innerHTML = PROG_ITEMS.map((item, i) => `
      <div class="ckr${progCk.includes(i) ? ' done' : ''}" id="ck${i}">
        <input type="checkbox" id="pc${i}" ${progCk.includes(i) ? 'checked' : ''} onchange="Render.tglPc(${i})">
        <label for="pc${i}">${item}</label>
      </div>`).join('');
  }

  function tglPc(i) {
    if (progCk.includes(i)) progCk = progCk.filter(x => x !== i);
    else progCk.push(i);
    localStorage.setItem('csa_pc', JSON.stringify(progCk));
    progChecklist();
  }

  // ── ALL (render tout) ─────────────────────────────────────────────────────
  function all() {
    dashboard();
    tasks();
    budget();
    venues();
    volunteers();
    providers();
    guests();
    badges();
    progChecklist();
  }

  return { all, dashboard, tasks, budget, venues, volunteers, providers, guests, badges, progChecklist, tglPc };
})();

// ── Cycle statut rapide ────────────────────────────────────────────────────────
function cycleStatus(id) {
  const t = window.S.tasks.find(x => x.id === id);
  if (!t) return;
  const cycle = ['غير منجز', 'قيد الانجاز', 'منجز'];
  t.status = cycle[(cycle.indexOf(t.status) + 1) % cycle.length];
  Sync.save();
  Render.all();
  UI.showToast('Statut → ' + sFr(t.status), 'ok');
}
