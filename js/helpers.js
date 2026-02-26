// ─── HELPERS & UTILITAIRES ────────────────────────────────────────────────────

const UI = (() => {
  // ── Toast notification ────────────────────────────────────────────────────
  function showToast(msg, type = '') {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3000);
  }

  // ── Loading overlay ───────────────────────────────────────────────────────
  function showLoading(show) {
    let el = document.getElementById('loading-overlay');
    if (!el) {
      el = document.createElement('div');
      el.id = 'loading-overlay';
      el.innerHTML = `
        <div style="font-size:40px">🇸🇾</div>
        <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#e8b84b">Club des Syriens</div>
        <div style="font-size:14px;color:rgba(255,255,255,0.6)" id="loading-msg">Connexion à Google Sheets...</div>
        <div class="spin"></div>`;
      document.body.appendChild(el);
    }
    el.style.display = show ? 'flex' : 'none';
  }

  // ── Modal helpers ─────────────────────────────────────────────────────────
  function openMo(type) { document.getElementById('mo-' + type)?.classList.add('open'); }
  function closeMo(id)  { document.getElementById(id)?.classList.remove('open'); }
  function closeMoOut(e, id) { if (e.target.id === id) closeMo(id); }

  // ── Navigation ────────────────────────────────────────────────────────────
  function nav(el) {
    document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    document.getElementById('sec-' + el.dataset.s)?.classList.add('active');
    Render.all();
  }

  // ── Countdown ─────────────────────────────────────────────────────────────
  function updateCD() {
    const diff = Math.max(0, Math.ceil((new Date('2026-03-28T18:30:00') - new Date()) / 86400000));
    const el = document.getElementById('cd');
    if (el) el.textContent = diff;
  }

  return { showToast, showLoading, openMo, closeMo, closeMoOut, nav, updateCD };
})();

// ── Fonctions globales réutilisées dans les onclick HTML ──────────────────────
window.openMo      = UI.openMo;
window.closeMo     = UI.closeMo;
window.closeMoOut  = UI.closeMoOut;
window.nav         = UI.nav;
window.showToast   = UI.showToast;

// ── Formatters ────────────────────────────────────────────────────────────────
function fmt(n)  { return (n || 0).toLocaleString('fr-FR') + '€'; }
function fmtD(d) { if (!d) return ''; return new Date(d).toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric' }); }
function sFr(s)  { return s === 'غير منجز' ? 'Non commencée' : s === 'قيد الانجاز' ? 'En cours' : s === 'منجز' ? 'Terminée' : s; }
function sIco(s) { return s === 'منجز' ? '✅' : s === 'قيد الانجاز' ? '🔄' : '⏳'; }
function bCls(s) { return s === 'منجز' ? 'b-done' : s === 'قيد الانجاز' ? 'b-prog' : 'b-pend'; }

// ── Collapse/expand catégories ────────────────────────────────────────────────
function tgl(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// ── Delete générique ──────────────────────────────────────────────────────────
function delItem(col, id) {
  if (!confirm('Confirmer la suppression ?')) return;
  window.S[col] = window.S[col].filter(x => x.id !== id);
  Sync.save();
  Render.all();
  UI.showToast('Supprimé', 'ok');
}

// ── Export CSV invités ────────────────────────────────────────────────────────
function exportCSV() {
  const rows = [['Nom','Email','Téléphone','Statut','Ticket payé','Notes']];
  window.S.guests.forEach(g => rows.push([g.name, g.email||'', g.phone||'', g.status, g.ticket, g.notes||'']));
  const href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.map(r => r.map(c => '"' + c + '"').join(',')).join('\n'));
  const a = document.createElement('a');
  a.href = href; a.download = 'invites_club_syriens.csv'; a.click();
  UI.showToast('CSV exporté ✅', 'ok');
}
